import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import NavButton from '../components/common/NavButton';
import FilterAndSort from '../components/FilterAndSort';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import PagingTrigger from '../components/utils/PagingTrigger';
import useModal from '../hooks/useModal';
import usePosts from '../hooks/usePosts';
import Post from '../models/Post';
import { RoutePath } from '../routes/routes';
import { useAppDispatch } from '../state/hooks';
import {
    pageIncremented,
} from '../state/posts/postsSlice';

function PostListPage() {
    const dispatch = useAppDispatch();
    const { posts, deletePost, editPost } = usePosts();

    const editModal = useModal<Post>();
    const deleteModal = useModal<Post>();

    return (<div>
        <Modal open={editModal.isActive} onClose={editModal.close}>
            <PostForm
                post={editModal.selected}
                onSubmit={postData => {
                    editModal.close();
                    editPost(postData);
                }} />
        </Modal>
        <Modal open={deleteModal.isActive} onClose={deleteModal.close}>
            <Alert
                message='Удалить запись?'
                onCancel={deleteModal.close}
                onConfirm={() => {
                    deleteModal.close();
                    deletePost(deleteModal.selected);
                }} />
        </Modal>
        <nav><NavButton to={RoutePath.NEW_POST}>Новая запись</NavButton></nav>
        <FilterAndSort />
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

export default PostListPage;