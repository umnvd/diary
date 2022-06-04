import { FunctionComponent, useState } from 'react';
import Post from '../models/Post';
import axios from 'axios';
import ImageCropper from './ImageCropper';
import { dataUrlToFile } from '../data/utils/fileUtils';

interface PostFormProps {
    post?: Post;
}

const PostForm: FunctionComponent<PostFormProps> = () => {
    const post = {
        "id": 3,
        "title": "Нейросеть сочинила мини-историю про дружбу робота и человека",
        "body": "Пользователь Триструм Таттл сообщил о том, как попросил ИИ написать небольшой рассказ об искусственном интеллекте, а затем использовал другой ИИ для создания иллюстраций к этой истории. Получился настораживающе невинный мини-рассказ с некоторыми агитационными вкраплениями, как если бы искусственный интеллект способствовал популяризации ИИ и его глобальному внедрению в быт.",
        "image": "Sftebz0AVoBr6oaTYenz1z1SJG3mmWw.jpg",
        "ts": 1653822071998
    } as Post;

    const [croppedImage, setCroppedImage] = useState('');

    const clickHandler = () => {
        const file = dataUrlToFile(croppedImage, 'asdf.jpg');

        const fd = new FormData();
        fd.append('image', file);
        fd.append('title', 'image post');
        fd.append('body', 'asdf');
        axios.post('http://localhost:3010/posts/', fd);
    };

    return (<div>
        <button onClick={clickHandler}>Save</button>
        <ImageCropper url={'http://localhost:3010/images/' + post.image} onSave={setCroppedImage} />
        <img src={croppedImage} alt={croppedImage}></img>
    </div>);
}

export default PostForm;

interface DemoProps {
    url: string;
    onSave: (croppedImage: string) => void;
}