import axios from 'axios';
import { FunctionComponent } from 'react';
import Comment from '../models/Comment';
import '../styles/CommentItem.css'

interface CommentItemProps {
    comment: Comment;
    onDelete: () => void;
}

const CommentItem: FunctionComponent<CommentItemProps> = (
    { comment, onDelete }
) => {

    return (<article className='comment-item'>
        <h4>{comment.user.name}</h4>
        <p>{comment.body}</p>
        <button onClick={onDelete}>Удалить</button>
    </article>);
}

export default CommentItem;