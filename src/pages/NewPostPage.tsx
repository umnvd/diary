import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '../routes/routes';

function NewPostPage() {
    return ( <div>
        <div>
            <NavLink to={RoutePath.POST_LIST}>Home</NavLink>
        </div>
        New post
    </div> );
}

export default NewPostPage;