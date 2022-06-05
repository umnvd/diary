import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavButton from '../components/common/NavButton';
import Modal from '../components/common/Modal';
import PostForm from '../components/PostForm';
import { addPost } from '../data/posts/postsService';
import { RoutePath } from '../routes/routes';

function NewPostPage() {
    const navigate = useNavigate();

    return (<div>
        <nav>
            <NavButton to={RoutePath.POST_LIST}>Home</NavButton>
        </nav>
        <PostForm onSubmit={postData => {
            addPost(postData)
                .then(() => navigate(RoutePath.POST_LIST, { replace: true }));
        }} />
    </div>);
}

export default NewPostPage;