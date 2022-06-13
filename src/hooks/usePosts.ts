import { useEffect } from 'react';
import { postsService } from '../data/PostsService';
import Post, { PostData } from '../models/Post';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchPosts } from '../state/posts/postsActionCreators';
import { refreshed, selectPosts } from '../state/posts/postsSlice';
import { loading, setError, setSuccess } from '../toast/Toast';

function usePosts() {
    const dispatch = useAppDispatch();
    const { posts, sort, currentPage,
        dateFilter, searchQuery } = useAppSelector(selectPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [currentPage, sort, dateFilter, searchQuery, dispatch]);

    useEffect(() => {
        return () => { dispatch(refreshed) };
    }, [dispatch])

    const deletePost = (post?: Post) => {
        if (!post) return;
        const id = loading('Удаление записи');
        postsService.deletePost(post.id)
            .then(() => dispatch(refreshed()))
            .then(() => setSuccess(id, 'Запись удалена'))
            .catch(() => setError(id, 'Ошибка удаления записи'));
    }

    const editPost = (post?: PostData) => {
        if (!post) return;
        const id = loading('Редактирование записи');
        postsService.editPost(post)
            .then(() => dispatch(refreshed()))
            .then(() => setSuccess(id, 'Запись отредактирована'))
            .catch(() => setError(id, 'Ошибка редактирования записи'));
    }

    return {
        posts,
        deletePost,
        editPost,
    }
}

export default usePosts;
