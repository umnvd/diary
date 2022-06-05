import { AxiosInstance, AxiosRequestConfig } from 'axios';
import DateFilterConfig from '../models/DateFilterConfig';
import Post, { PostData, PostsWithTotalCount } from '../models/Post';
import SortConfig from '../models/SortConfig';
import axiosInstance from './axiosInstance';

export interface PostsService {
    getPosts(
        page: number,
        search: string,
        sort: SortConfig,
        filter: DateFilterConfig
    ): Promise<PostsWithTotalCount>;

    addPost(post: PostData): Promise<Post>

    editPost(post: PostData): Promise<Post>

    deletePost(postId: number): Promise<void>
}

class PostsServiceImpl implements PostsService {

    readonly postsPath = '/posts'

    constructor(private readonly axios: AxiosInstance) { }

    async getPosts(
        page: number,
        search: string,
        sort: SortConfig,
        filter: DateFilterConfig
    ): Promise<PostsWithTotalCount> {
        const config: AxiosRequestConfig = {
            params: {
                _sort: sort.option,
                _order: sort.order ? 'asc' : 'desc',
                _page: page,
                _limit: 5, // hardcode
            }
        };

        if (filter.startDate) config.params = { ...config.params, ts_gte: filter.startDate };
        if (filter.endDate) config.params = { ...config.params, ts_lte: filter.endDate };
        if (search) config.params = { ...config.params, title_like: search };

        const response = await this.axios.get<Post[]>(this.postsPath, config)
        return {
            posts: response.data,
            totalCount: parseInt(response.headers['x-total-count'])
        };
    }

    async addPost(post: PostData): Promise<Post> {
        return (await this.axios.post<Post>(
            this.postsPath, this.formData(post))
        ).data;
    }

    async editPost(post: PostData): Promise<Post> {
        return this.axios.patch(
            `${this.postsPath}/${post.id}`,
            this.formData(post)
        );
    }

    async deletePost(postId: number): Promise<void> {
        return await this.axios.delete(`${this.postsPath}/${postId}`);
    }

    private formData(postData: PostData): FormData {
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('body', postData.body);
        formData.append('image', postData.image);
        return formData;
    }
}

export const postsService: PostsService = new PostsServiceImpl(axiosInstance);