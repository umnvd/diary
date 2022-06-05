import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Alert from '../components/common/Alert';
import AllertModal from '../components/common/Alert';
import Modal from '../components/common/Modal';
import NavButton from '../components/common/NavButton';
import DateFilter from '../components/DateFilter';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import SearchBar from '../components/SearchBar';
import SortSelector from '../components/SortSelector';
import PagingTrigger from '../components/utils/PagingTrigger';
import { editPost } from '../data/posts/postsService';
import useModal from '../hooks/useModal';
import Post, { PostData } from '../models/Post';
import { sortOptions } from '../models/SortConfig';
import { RoutePath } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchPosts } from '../state/posts/postsActionCreators';
import {
    dateFilterChanged,
    fetched,
    pageIncremented,
    refreshed,
    searchQueryChanged,
    selectPosts,
    sortChanged
} from '../state/posts/postsSlice';

function PostListPage() {
    const dispatch = useAppDispatch();
    const { posts, isLoading, error, sort,
        currentPage, dateFilter, searchQuery } = useAppSelector(selectPosts);

    const editModal = useModal<Post>();
    const deleteModal = useModal<Post>();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [currentPage, sort, dateFilter, searchQuery]);

    useEffect(() => {
        return () => { dispatch(refreshed) };
    }, [])

    const deletePost = async (post?: Post) => {
        if (post)
            await axios.delete<Comment>(
                'http://localhost:3010/posts' + `/${post.id}`
            )
                .then(() => dispatch(fetched(posts.filter(p => p.id !== post.id))))
                .then(() => deleteModal.close());
    }

    const editPost2 = async (post?: PostData) => {
        if (post)
            await editPost(post).then(() => dispatch(refreshed()))
                .then(() => editModal.close())
                .then(() => (console.log('adf')))
    }

    return (<div>
        <Modal open={editModal.isActive} onClose={editModal.close}>
            <PostForm post={editModal.selected} onSubmit={editPost2} />
        </Modal>
        <Modal open={deleteModal.isActive} onClose={deleteModal.close}>
            <Alert message='Удалить запись?'
                onCancel={deleteModal.close}
                onConfirm={() => deletePost(deleteModal.selected)} />
        </Modal>
        <nav>
            <NavButton to={RoutePath.NEW_POST}>New</NavButton>
        </nav>
        <div className='post-list__header'>
            <div className='post-list__filter'>
                <SearchBar
                    query={searchQuery}
                    sotQuery={query => dispatch(searchQueryChanged(query))} />
                <DateFilter
                    config={dateFilter}
                    setConfig={config => dispatch(dateFilterChanged(config))} />
            </div>
            <SortSelector
                options={sortOptions}
                config={sort}
                setConfig={config => dispatch(sortChanged(config))} />
        </div>
        <section className='post-list'>
            {posts.map(post =>
                <PostItem
                    key={post.id}
                    post={post}
                    onEdit={() => editModal.show(post)}
                    onDelete={() => deleteModal.show(post)} />)}
        </section>
        <PagingTrigger onBottomReached={() => dispatch(pageIncremented())}></PagingTrigger>
    </div>);
}

// {isLoading && <h1>Loading...</h1>}
// {error.length > 0 && <h1>{error}</h1>}

export default PostListPage;