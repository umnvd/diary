import { ChangeEvent, FunctionComponent, useState } from 'react';
import Post from '../models/Post';
import axios from 'axios';
import ImageCropper from './ImageCropper';
import { dataUrlToFile, FileSchema, fileSchema, getUrl, readFileDataUrl } from '../data/utils/fileUtils';
import yup, { array, object, string } from 'yup';
import { Formik, FieldArray, FormikErrors } from 'formik';
import { dir } from 'console';
import { mixed } from 'yup';
import { isArrayTypeNode } from 'typescript';

interface PostFormValues {
    title: string;
    body: string;
    image: FileSchema | undefined;
}

interface PostFormSubmitedValues {
    title: string;
    body: string;
    image: File;
}

interface PostFormProps {
    onSubmit: (values: PostFormSubmitedValues) => void;
    post?: Post;
}

const PostForm: FunctionComponent<PostFormProps> = (
    { onSubmit, post }
) => {
    const [imageUrl, setImageUrl] = useState('');
    const [croppedImageUrl, setCroppedImageUrl] = useState('');
    const acceptableTypes = [
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/gif'
    ];
    const initialValues: PostFormValues = {
        title: post?.title ?? '',
        body: post?.body ?? '',
        image: undefined
    }

    post?.image && setImageUrl(getUrl(post.image));

    let imageSchema = array().of(object().shape({
        file: mixed().required(),
        type: string()
            .oneOf(
                acceptableTypes,
                'Поддерживаемые типы: jpeg, png, svg, gif'
            )
            .required(),
        name: string().required()
    }).typeError(''));

    imageSchema = post?.image
        ? imageSchema.notRequired()
        : imageSchema.required('Добавьте изображение');

    const validationSchema = object().shape({
        title: string().required('Введите название'),
        body: string().required('Введите текст записи'),
        image: imageSchema
    });

    const errorMessages = (
        errors: string | Array<{ type: string }> | undefined
    ) => {
        const result: string[] = []
        if (errors) {
            if (Array.isArray(errors))
                errors.forEach(e => result.push(e.type))
            else
                result.push(errors)
        }
        return result;
    }

    const prepareSubmit = (values: PostFormValues) => onSubmit({
            title: values.title,
            body: values.body,
            image: dataUrlToFile(
                croppedImageUrl, 
                values.image?.name ?? post?.image ?? 'img.'
                )
            })
            console.log(imageUrl);
    

    return (<div>
        <Formik
            initialValues={initialValues}
            validateOnBlur
            onSubmit={prepareSubmit}
            validationSchema={validationSchema}>
            {({ values, errors, touched, handleChange,
                handleBlur, isValid, handleSubmit, dirty }) => (
                <>
                    <div>
                        <label htmlFor='title'>Название<br /></label>
                        <input
                            type='text'
                            name='title'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title} />
                        {touched.title && errors.title
                            && <p>{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor='body'>Запись<br /></label>
                        <textarea
                            name='body'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.body} />
                        {touched.body && errors.body
                            && <p>{errors.body}</p>}
                    </div>
                    <label htmlFor='image'>Изображение<br /></label>
                    {console.log(errors)}
                    <FieldArray name='image'>
                        {arrayHelper => (
                            <input
                                type='file'
                                name='image'
                                // accept={acceptableTypes.join(', ')}
                                onChange={event => {
                                    const file = event.target.files?.item(0);
                                    if (!file) {
                                        arrayHelper.remove(0);
                                        return;
                                    };
                                    if (Array.isArray(values.image))
                                        arrayHelper.replace(0, fileSchema(file));
                                    else
                                        arrayHelper.push(fileSchema(file));
                                    readFileDataUrl(file, setImageUrl);
                                }}
                                onBlur={handleBlur}
                            />
                        )}
                    </FieldArray>
                    {touched.image && errors.image
                        && errorMessages(errors.image).map(message =>
                            <p key={message}>{message}</p>
                        )}
                    <ImageCropper url={imageUrl} setDataUrl={setCroppedImageUrl} />
                    <button
                        type='submit'
                        disabled={!isValid && !dirty}
                        onClick={() => handleSubmit()}
                    >Отправить</button>
                </>
            )}
        </Formik>
    </div>);
}

export default PostForm;