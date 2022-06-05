import moment from 'moment';
import React, { FunctionComponent, useCallback, useState } from 'react';
import Post from '../models/Post';
import '../styles/Post.css'
import CommentList from './CommentList';
import Button, { TextButton } from './common/Button';

interface PostItemProps {
    post: Post;
    onEdit: () => void;
    onDelete: () => void;
}

const PostItem: FunctionComponent<PostItemProps> = (
    { post, onEdit, onDelete }
) => {
    const [showComments, setShowComments] = useState(false);

    return (<article className='post-item'>
        <div className='post-item__head'>
            <h3 className='post-item__title'>{post.title}</h3>
            <div className='post-item__actions'>
                <Button onClick={onEdit}>Редактировать</Button>
                <Button onClick={onDelete}>Удалить</Button>
            </div>
        </div>
        <div className='post-item__content'>
            <p className='post-item__body'>{post.body}</p>
            <img className='post-item__image' src={'http://localhost:3010/images/' + post.image} height={150} alt={post.title} />
        </div>
        <div className='post-item__footer'>
            <TextButton onClick={e => setShowComments(!showComments)}>Комментарии</TextButton>
            <p className='post-item__date'>{moment(post.ts).format('DD.MM.YYYY hh:mm')}</p>
        </div>
        {showComments && <CommentList post={post} />}
    </article>);
}

export default PostItem;