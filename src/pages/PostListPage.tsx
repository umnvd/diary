import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PostItem from '../components/PostItem';
import SortSelector from '../components/SortSelector';
import { sortOptions } from '../models/Sort';
import { RoutePath } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchPosts } from '../state/posts/postsActionCreator';
import { changed, selectSort } from '../state/sort/sortReducer';

function PostListPage() {
    const dispatch = useAppDispatch();
    const { posts, isLoading, error } = useAppSelector(state => state.posts);
    const sort = useAppSelector(selectSort);

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
            setConfig={config => dispatch(changed(config))}></SortSelector>
        {posts.map(post =>
            <PostItem key={post.id} post={post} />)}
    </div>);
}

export default PostListPage;