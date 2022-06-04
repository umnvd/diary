import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PostItem from '../components/PostItem';
import SortSelector from '../components/SortSelector';
import { sortOptions } from '../models/Sort';
import { RoutePath } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchPosts } from '../state/posts/postsActionCreators';
import { selectPostsConfig, sortChanged } from '../state/posts/postsConfigSlice';
import { selectPostsUi } from '../state/posts/postsUiSlice';

function PostListPage() {
    const dispatch = useAppDispatch();
    const { posts, isLoading, error } = useAppSelector(selectPostsUi);
    const { sort } = useAppSelector(selectPostsConfig);

    useEffect(() => {
        dispatch(fetchPosts());
        console.log('fetch called')
    }, [sort]);

    return (<div>
        <div>
            <NavLink to={RoutePath.NEW_POST}>New</NavLink>
        </div>
        {isLoading && <h1>Loading...</h1>}
        {error.length > 0 && <h1>{error}</h1>}
        <SortSelector
            options={sortOptions}
            config={sort}
            setConfig={config => dispatch(sortChanged(config))}></SortSelector>
        {posts.map(post =>
            <PostItem key={post.id} post={post} />)}
    </div>);
}

export default PostListPage;