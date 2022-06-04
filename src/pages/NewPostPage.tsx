import React from 'react';
import { NavLink } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { RoutePath } from '../routes/routes';

function NewPostPage() {
    return ( <div>
        <div>
            <NavLink to={RoutePath.POST_LIST}>Home</NavLink>
        </div>
        <PostForm />
    </div> );
}

export default NewPostPage;