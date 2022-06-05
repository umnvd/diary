import { FunctionComponent, useEffect, useRef, useState } from 'react';
import Post, { PostData } from '../models/Post';
import { dataUrlToFile, FileSchema, fileSchema, getUrl, readFileDataUrl } from '../data/utils/fileUtils';
import { array, object, string } from 'yup';
import { Formik, FieldArray, FormikHelpers, FormikHandlers, useFormikContext, FormikContextType } from 'formik';
import { mixed } from 'yup';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import '../styles/PostForm.css';
import Input from './common/Input';
import TextArea from './common/TextArea';
import Button from './common/Button';

interface PostFormValues {
    title: string;
    body: string;
    image: FileSchema | undefined;
}

interface PostFormProps {
    onSubmit: (values: PostData) => void;
    post?: Post;
}

const ResetFormOnUnmount = () => {
    const { resetForm } = useFormikContext<PostFormValues>();
    useEffect(() => {
        return resetForm;
    }, [resetForm]);
    return null;
}

const PostForm: FunctionComponent<PostFormProps> = (
    { onSubmit, post }
) => {
    const [imageUrl, setImageUrl] = useState('');
    const cropperRef = useRef<HTMLImageElement>(null);
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

    const submitForm = (
        values: PostFormValues,
    ) => {
        onSubmit({
            id: post?.id ?? 0,
            title: values.title,
            body: values.body,
            image: dataUrlToFile(
                croppedImageUrl(),
                values.image?.name ?? post?.image ?? 'img.jpg'
            )
        });
    };

    const croppedImageUrl = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        return cropper.getCroppedCanvas().toDataURL();
    }

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
    };

    useEffect(() => {
        if (post?.image) {
            setImageUrl(getUrl(post.image));
        }
    }, [post, imageUrl])

    return (
        <Formik className='post-form'
            initialValues={initialValues}
            validateOnBlur
            onSubmit={submitForm}
            validationSchema={validationSchema}>
            {({ values, errors, touched, handleChange,
                handleBlur, isValid, handleSubmit, dirty }) => (
                <>
                    <div>
                        <label htmlFor='title'>Название<br /></label>
                        <Input
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
                        <TextArea
                            name='body'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.body} />
                        {touched.body && errors.body
                            && <p>{errors.body}</p>}
                    </div>
                    <label htmlFor='image'>Изображение<br /></label>
                    <FieldArray name='image'>
                        {arrayHelper => (
                            <Input
                                type='file'
                                name='image'
                                accept={acceptableTypes.join(', ')}
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
                                onBlur={handleBlur} />
                        )}
                    </FieldArray>
                    {touched.image && errors.image
                        && errorMessages(errors.image).map(message => <p key={message}>{message}</p>)}
                    <Cropper
                        src={imageUrl}
                        className='image-cropper'
                        initialAspectRatio={1 / 1}
                        guides={false}
                        ref={cropperRef}
                        viewMode={1}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} />
                    <Button
                        type='submit'
                        disabled={!isValid && !dirty}
                        onClick={() => handleSubmit()}
                    >Отправить</Button>
                    <ResetFormOnUnmount />
                </>
            )}
        </Formik>);
}

export default PostForm;