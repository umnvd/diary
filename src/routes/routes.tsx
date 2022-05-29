import { RouteObject } from "react-router-dom";
import NewPostPage from "../pages/NewPostPage";
import PostListPage from "../pages/PostListPage";

export enum RoutePath {
    POST_LIST = '/',
    NEW_POST = '/new'
}

export const routeObjects: RouteObject[] = [
    {
        path: RoutePath.POST_LIST,
        element: <PostListPage />
    },
    {
        path: RoutePath.NEW_POST,
        element: <NewPostPage />
    },
]