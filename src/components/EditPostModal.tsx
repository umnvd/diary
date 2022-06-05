import { FunctionComponent } from 'react';
import Post , { PostData }from '../models/Post';
import { selectPosts } from '../state/posts/postsSlice';
import Modal from './common/Modal';
import PostForm from './PostForm';

interface EditPostModalProps {
    post?: Post;
    setPost: (post: Post | undefined) => void;
}

const EditPostModal: FunctionComponent<EditPostModalProps> = (
    { post, setPost }
) => {
    if (!post) return null;

    const handleSubmit = (values: PostData) => {
        console.log(values);
        setPost(undefined);
    }

    return (
        // <Modal
        //     isActive={post != undefined}
        //     setIsActive={isActive => {
        //         if (!isActive)
        //             setPost(undefined);
        //     }}
        // >
        //     <PostForm
        //         onSubmit={handleSubmit}
        //         post={post} />
        // </Modal>
        <div></div>
    );
}

export default EditPostModal;