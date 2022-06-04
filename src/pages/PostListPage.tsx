import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PostItem from '../components/PostItem';
import { RoutePath } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchPosts } from '../state/posts/postsActionCreator';

function PostListPage() {
    const dispatch = useAppDispatch();
    const { posts, isLoading, error }  = useAppSelector(state => state.posts);
    
    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (<div>
        <div>
            <NavLink to={RoutePath.NEW_POST}>New</NavLink>
        </div>
        {isLoading && <h1>Loading...</h1>}
        {error.length > 0 && <h1>{error}</h1>}
        {posts.map(post =>
            <PostItem key={post.id} post={post} />)}
    </div>);
}

export default PostListPage;