import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Post from '../../models/Post'
import { AppDispatch, RootState } from '../store';
import { maxPageReceived } from './postsConfigSlice';
import { failed, fetched, fetchStarted } from './postsUiSlice';

export const fetchPosts = () => async (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const state = getState();
    const page = state.postsConfig.currentPage;
    const sortConfig = state.postsConfig.sort;

    try {
        const config: AxiosRequestConfig = {
            params: {
                _sort: sortConfig.option,
                _order: sortConfig.order ? 'asc' : 'desc',
                _page: page,
                _limit: 5, // hardcoded
            }
        }

        dispatch(fetchStarted());
        const response = await axios.get<Post[]>('http://localhost:3010/posts', config);

        if (state.postsConfig.maxPage === 0) {
            const totalCount = parseInt(response.headers['x-total-count']);
            dispatch(maxPageReceived(totalCount));
            console.log('total pages received');
        }

        const result = [...state.postsUi.posts, ...response.data]
        dispatch(fetched(result));
    } catch (e) {
        const message = (e as AxiosError).message || 'Ошибка загрузки';
        dispatch(failed(message));
    }
}