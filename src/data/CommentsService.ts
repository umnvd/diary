import { AxiosInstance } from 'axios';
import Comment from '../models/Comment';
import axiosInstance from './axiosInstance';

export interface CommentsService {
    getComments(postId: number): Promise<Comment[]>;

    addComment(comment: Comment): Promise<Comment>

    deleteComment(commentId: number): Promise<void>
}

class CommentsServiceImpl implements CommentsService {

    readonly commentsPath = '/comments'

    constructor(private readonly axios: AxiosInstance) { }

    async getComments(postId: number): Promise<Comment[]> {
        const response = await this.axios.get<Comment[]>(
            this.commentsPath, { params: { postId: postId } }
        );
        return response.data;
    }

    async addComment(comment: Comment): Promise<Comment> {
        return (await this.axios.post<Comment>(
            this.commentsPath, comment
        )).data;

    }

    async deleteComment(commentId: number): Promise<void> {
        return await this.axios.delete(`${this.commentsPath}/${commentId}`);
    }

}

export const commentsService: CommentsService = new CommentsServiceImpl(axiosInstance);