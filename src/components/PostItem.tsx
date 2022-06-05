import moment from 'moment';
import React, { FunctionComponent, useCallback, useState } from 'react';
import Post from '../models/Post';
import '../styles/PostItem.css'
import CommentList from './CommentList';

interface PostItemProps {
    post: Post;
    onClick: () => void;
}

const PostItem: FunctionComponent<PostItemProps> = (
    { post, onClick }
) => {
    const [showComments, setShowComments] = useState(false);

    return (<article className='post-item'>
        <div className='post-item__head'>
            <h3 className='post-item__title'>{post.title}</h3>
            <div className='post-item__actions'>
                <button onClick={onClick}>Редактировать</button>
                <button>Удалить</button>
            </div>
        </div>
        <div className='post-item__content'>
            <p className='post-item__body'>{post.body}</p>
            <img className='post-item__image' src={'http://localhost:3010/images/' + post.image} height={150} alt={post.title}/>
            <p>{moment(post.ts).format('DD.MM.YYYY hh:mm')}</p>
        </div>
        <div>
            <button onClick={e => setShowComments(!showComments)}>Комментарии</button>
            {showComments && <CommentList post={post} />}
        </div>
    </article>);
}

export default PostItem;