import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Post from '../../models/Post'
import { useAppSelector } from '../hooks';
import { AppDispatch, RootState } from '../store';
import { postsActions } from './postsReducer';

export const fetchPosts = () => async (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    try {
        const sortConfig = getState().sort;

        const config: AxiosRequestConfig = {
            params: {
                _sort: sortConfig.option,
                _order: sortConfig.order ? 'asc' : 'desc'
            }
        }

        dispatch(postsActions.fetch());
        const response = await axios.get<Post[]>('http://localhost:3010/posts', config);
        dispatch(postsActions.success(response.data));
    } catch (e) {
        const message = (e as AxiosError).message || 'Ошибка загрузки';
        dispatch(postsActions.error(message));
    }
}