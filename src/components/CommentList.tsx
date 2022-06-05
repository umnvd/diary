import { FunctionComponent, useState } from 'react';
import CommentItem from './CommentItem';
import Post from '../models/Post';
import Comment from '../models/Comment';
import Modal from './common/Modal';
import useModal from '../hooks/useModal';
import Alert from './common/Alert';
import Button from './common/Button';
import Input from './common/Input';
import '../styles/Comment.css'
import useComments from '../hooks/useComments';

interface CommentListProps {
    post: Post;
}

const CommentList: FunctionComponent<CommentListProps> = (
    { post }
) => {
    const {comments, sendComment, deleteComment} = useComments(post.id);
    const [commentText, setCommentText] = useState('');
    const deleteModal = useModal<Comment>();

    return (
        <>
            <Modal open={deleteModal.isActive} onClose={deleteModal.close}>
                <Alert message='Удалить комментарий'
                    onCancel={deleteModal.close}
                    onConfirm={() => {
                        deleteModal.close();
                        deleteComment(deleteModal.selected);
                    }} />
            </Modal>
            <section className='comment-list'>
                {comments.map(comment =>
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onDelete={() => deleteModal.show(comment)} />)}
                <div className='comment-list__new-comment'>
                    <Input
                        type="text"
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)} />
                    <Button onClick={() => {
                        sendComment(commentText);
                    }}>Отправить</Button>
                </div>
            </section>
        </>
    );
}

export default CommentList;