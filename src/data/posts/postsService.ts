import axios from 'axios';
import Post, { PostData } from '../../models/Post';

export async function addPost(postData: PostData) {
    await axios.post(
        'http://localhost:3010/posts/',
        formData(postData)
    );
}

export async function editPost(postData: PostData) {
    await axios.patch(
        `http://localhost:3010/posts/${postData.id}`,
        formData(postData)
    );
}

function formData(postData: PostData): FormData {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('body', postData.body);
    formData.append('image', postData.image);
    return formData;
}