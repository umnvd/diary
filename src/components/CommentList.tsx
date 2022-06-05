import axios, { AxiosError } from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import Post from '../models/Post';
import Comment from '../models/Comment';
import User, { currentUser } from '../models/User';
import Modal from './common/Modal';
import useModal from '../hooks/useModal';
import Alert from './common/Alert';
import Button from './common/Button';
import Input from './common/Input';
import '../styles/Comment.css'

interface CommentListProps {
    post: Post;
}

const CommentList: FunctionComponent<CommentListProps> = (
    { post }
) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState<string>('');
    const deleteModal = useModal<Comment>();

    const fetchComments = async () => {
        const response = await axios.get<Comment[]>(
            'http://localhost:3010/comments',
            { params: { postId: post.id } }
        );
        return response.data;
    }

    const sendComment = async () => {
        await axios.post<Comment>(
            'http://localhost:3010/comments',
            {
                id: 0,
                postId: post.id,
                user: currentUser,
                body: commentText
            }
        )
            .then(r => setComments([...comments, r.data]))
            .then(() => setCommentText(''))
    }

    

    const deleteComment = async (comment?: Comment) => {
        if (comment)
        await axios.delete<Comment>(
            'http://localhost:3010/comments' + `/${comment.id}`
        )
        .then(() => setComments(comments.filter(c => c.id !== comment.id)))
        .then(() => deleteModal.close()); // TODO
    }

    useEffect(() => {
        fetchComments()
            .then(setComments)
            .then(_ => console.log('fetch comments called'))
            .catch(e => setError((e as AxiosError).message));
    }, [])

    return (
        <>
        <Modal open={deleteModal.isActive} onClose={deleteModal.close}>
            <Alert message='Удалить комментарий'
            onCancel={deleteModal.close}
            onConfirm={() => deleteComment(deleteModal.selected)}/>
        </Modal>
        <section className='comment-list'>
            {error.length > 0 && <h4>{error}</h4>}
            {comments.map(comment =>
                <CommentItem 
                key={comment.id} 
                comment={comment} 
                onDelete={() => deleteModal.show(comment)}/>)}
            <div className='comment-list__new-comment'>
                <Input
                    type="text"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)} />
                <Button onClick={sendComment}>Отправить</Button>
            </div>
        </section>
        </>
    );
}

export default CommentList;