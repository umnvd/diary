import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../components/common/Modal';
import PostForm from '../components/PostForm';
import { RoutePath } from '../routes/routes';

function NewPostPage() {
    const [test, setTest] = useState(false);

    return ( <div>
        <div>
            <NavLink to={RoutePath.POST_LIST}>Home</NavLink>
        </div>
        {/* <PostForm onSubmit={v => console.log(v)}/> */}
        <button onClick={() => setTest(true)}>open</button>
        <Modal open={test} onClose={() => setTest(false)}>
            <div>ABOBA</div>
        </Modal>
    </div> );
}

export default NewPostPage;