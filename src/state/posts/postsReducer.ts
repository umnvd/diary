import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../models/models'

interface PostListState {
    posts: Post[],
    isLoading: boolean,
    error: string
}

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: false,
        error: ''
    } as PostListState,
    reducers: {
        fetch: state => {
            state.error = '';
            state.isLoading = true;
        },
        success: (state, action: PayloadAction<Post[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const postsActions = postsSlice.actions;
export const postsReducer = postsSlice.reducer;