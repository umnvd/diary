import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Post from '../../models/Post'
import { AppDispatch, RootState } from '../store';
import { failed, fetched, fetchStarted, maxPageReceived } from './postsSlice';

export const fetchPosts = () => async (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const state = getState();
    const page = state.posts.currentPage;
    const sortConfig = state.posts.sort;
    const dateFilterConfig = state.posts.dateFilter

    try {
        const config: AxiosRequestConfig = {
            params: {
                _sort: sortConfig.option,
                _order: sortConfig.order ? 'asc' : 'desc',
                _page: page,
                _limit: 5, // hardcoded
            }
        }

        if (dateFilterConfig.startDate) {
            config.params = {...config.params, ts_gte: dateFilterConfig.startDate};
        }

        if (dateFilterConfig.endDate) {
            config.params = {...config.params, ts_lte: dateFilterConfig.endDate};
        }

        dispatch(fetchStarted());
        const response = await axios.get<Post[]>('http://localhost:3010/posts', config);

        if (state.posts.maxPage === 0) {
            const totalCount = parseInt(response.headers['x-total-count']);
            dispatch(maxPageReceived(totalCount));
            console.log('total pages received');
        }

        const result = [...state.posts.posts, ...response.data]
        dispatch(fetched(result));
    } catch (e) {
        const message = (e as AxiosError).message || 'Ошибка загрузки';
        dispatch(failed(message));
    }
}