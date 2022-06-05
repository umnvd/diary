import { useNavigate } from 'react-router-dom';
import NavButton from '../components/common/NavButton';
import PostForm from '../components/PostForm';
import { RoutePath } from '../routes/routes';
import { postsService } from '../data/PostsService';

function NewPostPage() {
    const navigate = useNavigate();

    return (<div>
        <nav><NavButton to={RoutePath.POST_LIST}>Список записей</NavButton></nav>
        <PostForm onSubmit={postData => {
            postsService
                .addPost(postData)
                .then(() => navigate(RoutePath.POST_LIST, { replace: true }));
        }} />
    </div>);
}

export default NewPostPage;