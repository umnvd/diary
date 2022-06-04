import axios, { AxiosError } from 'axios'
import { Post } from '../../models/models'
import { AppDispatch } from '../store';
import { postsActions } from './postsReducer';

export const fetchPosts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(postsActions.fetch());
        const response = await axios.get<Post[]>('http://localhost:3010/posts');
        dispatch(postsActions.success(response.data));
    } catch (e) {
        const message = (e as AxiosError).message || 'Ошибка загрузки';
        dispatch(postsActions.error(message));
    }
}