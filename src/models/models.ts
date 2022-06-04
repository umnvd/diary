export interface Post {
    id: number;
    title: string;
    body: string;
    image: string;
    ts: number;
}

export interface Comment {
    id: number;
    postId: number;
    user: User;
    body: string;
}

export interface User {
    name: string;
    image: string
    role: number;
}