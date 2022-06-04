import User from './User';

export default interface Comment {
    id: number;
    postId: number;
    user: User;
    body: string;
}