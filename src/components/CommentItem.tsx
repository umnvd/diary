import { FunctionComponent } from 'react';
import Comment from '../models/Comment';
import '../styles/CommentItem.css'

interface CommentItemProps {
    comment: Comment;
}
 
const CommentItem: FunctionComponent<CommentItemProps> = (
    {comment}
) => {
    return ( <article className='comment-item'>
        <h4>{comment.user.name}</h4>
        <p>{comment.body}</p>
    </article> );
}
 
export default CommentItem;