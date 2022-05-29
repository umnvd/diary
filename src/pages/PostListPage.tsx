import React from "react";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../routes/routes";

function PostListPage() {
    return (<div>
        <div>
            <NavLink to={RoutePath.NEW_POST}>New</NavLink>
        </div>
        Post list
    </div>);
}

export default PostListPage;