export default interface Post {
    id: number;
    title: string;
    body: string;
    image: string;
    ts: number;
}

export interface PostData {
    id: number;
    title: string;
    body: string;
    image: File;
}

export type PostsWithTotalCount = {
    posts: Post[],
    totalCount: number,
}