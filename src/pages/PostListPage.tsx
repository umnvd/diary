import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DateFilter from '../components/DateFilter';
import PostItem from '../components/PostItem';
import SortSelector from '../components/SortSelector';
import PagingTrigger from '../components/utils/PagingTrigger';
import { sortOptions } from '../models/SortConfig';
import { RoutePath } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchPosts } from '../state/posts/postsActionCreators';
import {
    dateFilterChanged,
    pageIncremented,
    selectPosts,
    sortChanged
} from '../state/posts/postsSlice';

function PostListPage() {
    const dispatch = useAppDispatch();
    const { posts, isLoading, error, sort, currentPage, dateFilter } = useAppSelector(selectPosts);

    useEffect(() => {
        dispatch(fetchPosts());
        console.log('fetch called')
    }, [currentPage, sort, dateFilter]);

    return (<div>
        <div>
            <NavLink to={RoutePath.NEW_POST}>New</NavLink>
        </div>
        <DateFilter
            config={dateFilter}
            setConfig={config => dispatch(dateFilterChanged(config))} />
        <SortSelector
            options={sortOptions}
            config={sort}
            setConfig={config => dispatch(sortChanged(config))} />
        {posts.map(post =>
            <PostItem key={post.id} post={post} />)}
        <PagingTrigger onBottomReached={() => dispatch(pageIncremented())}></PagingTrigger>
    </div>);
}


// {isLoading && <h1>Loading...</h1>}
// {error.length > 0 && <h1>{error}</h1>}

export default PostListPage;