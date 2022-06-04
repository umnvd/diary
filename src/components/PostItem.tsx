import React, { FunctionComponent, useState } from 'react';
import { Post } from '../models/models';
import '../styles/PostItem.css'
import CommentList from './CommentList';

interface PostItemProps {
    post: Post;
}

const PostItem: FunctionComponent<PostItemProps> = (
    { post }
) => {
    const [showComments, setShowComments] = useState(false);

    return (<article className='post-item'>
        <div className='post-item__head'>
            <h3 className='post-item__title'>{post.title}</h3>
            <div className='post-item__actions'>
                <button>Редактировать</button>
                <button>Удалить</button>
            </div>
        </div>
        <div className='post-item__content'>
            <p className='post-item__body'>{post.body}</p>
            <img className='post-item__image' src={post.image} />
        </div>
        <div>
            <button onClick={e => setShowComments(!showComments)}>Комментарии</button>
            {showComments && <CommentList post={post} />}
        </div>
    </article>);
}

export default PostItem;