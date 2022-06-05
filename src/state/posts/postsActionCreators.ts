import { postsService } from '../../data/PostsService';
import { loading, setError, setSuccess } from '../../toast/Toast';
import { AppDispatch, RootState } from '../store';
import { fetched, maxPageReceived } from './postsSlice';

export const fetchPosts = () => async (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const id = loading('Загрузка записей');
    const state = getState();
    try {
        const { posts, totalCount } = await postsService.getPosts(
            state.posts.currentPage,
            state.posts.searchQuery,
            state.posts.sort,
            state.posts.dateFilter
        );
        if (state.posts.maxPage === 0) {
            dispatch(maxPageReceived(totalCount));
        }
        dispatch(fetched([...state.posts.posts, ...posts]));
        setSuccess(id, 'Записи загружены');
    } catch (e) {
        setError(id, 'Ошибка загрузки записей');
    }
}