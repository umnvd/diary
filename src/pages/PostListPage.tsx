import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../components/common/Modal';
import DateFilter from '../components/DateFilter';
import EditPostModal from '../components/EditPostModal';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import SearchBar from '../components/SearchBar';
import SortSelector from '../components/SortSelector';
import PagingTrigger from '../components/utils/PagingTrigger';
import useModal from '../hooks/useModal';
import Post from '../models/Post';
import { sortOptions } from '../models/SortConfig';
import { RoutePath } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchPosts } from '../state/posts/postsActionCreators';
import {
    dateFilterChanged,
    pageIncremented,
    searchQueryChanged,
    selectPosts,
    sortChanged
} from '../state/posts/postsSlice';

function PostListPage() {
    const dispatch = useAppDispatch();
    const { posts, isLoading, error, sort,
        currentPage, dateFilter, searchQuery } = useAppSelector(selectPosts);

    const [modalIsActive, selectedPost, showModal, closeModal] = useModal();

    useEffect(() => {
        dispatch(fetchPosts());
        console.log('fetch called')
    }, [currentPage, sort, dateFilter, searchQuery]);

    return (<div>
        {/* <EditPostModal post={selectedPost} setPost={setSelectedPost}></EditPostModal> */}
        <Modal open={modalIsActive} onClose={() => closeModal()}>
            <PostForm post={selectedPost} onSubmit={v => console.log(v)} />
        </Modal>
        <div>
            <NavLink to={RoutePath.NEW_POST}>New</NavLink>
        </div>
        <SearchBar
            query={searchQuery}
            setQuery={query => dispatch(searchQueryChanged(query))} />
        <DateFilter
            config={dateFilter}
            setConfig={config => dispatch(dateFilterChanged(config))} />
        <SortSelector
            options={sortOptions}
            config={sort}
            setConfig={config => dispatch(sortChanged(config))} />
        {posts.map(post =>
            <PostItem key={post.id} post={post} onClick={() =>
                showModal(post)
                // console.log(post)
            } />)}
        <PagingTrigger onBottomReached={() => dispatch(pageIncremented())}></PagingTrigger>
    </div>);
}


// {isLoading && <h1>Loading...</h1>}
// {error.length > 0 && <h1>{error}</h1>}

export default PostListPage;