import axios from 'axios';
import { FunctionComponent } from 'react';
import { getUrl } from '../data/utils/fileUtils';
import Comment from '../models/Comment';
import { currentUser } from '../models/User';
import '../styles/Comment.css'
import { TextButton } from './common/Button';

interface CommentItemProps {
    comment: Comment;
    onDelete: () => void;
}

const CommentItem: FunctionComponent<CommentItemProps> = (
    { comment, onDelete }
) => {

    return (<article className={
        comment.user.role === currentUser.role
            ? 'comment-item current-user'
            : 'comment-item'
    }>
        <img
            className='comment-item__user-photo'
            src={getUrl(comment.user.image)}></img>
        <div className='comment-item__content'>
            <h3 className='comment-item__user-name'
            >{comment.user.name}</h3>
            <p>{comment.body}</p>
            <TextButton onClick={onDelete}>Удалить</TextButton>
        </div>
    </article>);
}

export default CommentItem;