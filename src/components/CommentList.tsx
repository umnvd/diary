import axios, { AxiosError } from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import Post from '../models/Post';
import Comment from '../models/Comment';
import User from '../models/User';

interface CommentListProps {
    post: Post;
}

const CommentList: FunctionComponent<CommentListProps> = (
    { post }
) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState<string>('');

    const fetchComments = async () => {
        const response = await axios.get<Comment[]>(
            'http://localhost:3010/comments',
            { params: { postId: post.id } }
        );
        return response.data;
    }

    const testComment = {
        id: 0,
        postId: 1,
        user: {
            name: "Test",
            image: "",
            role: 0
        } as User,
        body: "Test comment"
    } as Comment;

    const sendComment = async () => {
        await axios.post<Comment>(
            'http://localhost:3010/comments',
            testComment
        )
            .then(r => setComments([...comments, r.data]))
    }

    useEffect(() => {
        fetchComments()
            .then(setComments)
            .then(_ => console.log('fetch comments called'))
            .catch(e => setError((e as AxiosError).message));
    }, [post])

    return (
        <section className='comment-list'>
            {error.length > 0 && <h4>{error}</h4>}
            {comments.map(comment =>
                <CommentItem comment={comment} key={comment.id} />)}
            <div>
                <input type="text" />
                <button onClick={sendComment}>Отправить</button>
            </div>
        </section>
    );
}

export default CommentList;