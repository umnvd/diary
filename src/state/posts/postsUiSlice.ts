import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Post from '../../models/Post'
import { RootState } from '../store';

interface PostsUiState {
    posts: Post[],
    isLoading: boolean,
    error: string
}

const initialState: PostsUiState = {
    posts: [],
    isLoading: false,
    error: ''
}

const postsUiSlice = createSlice({
    name: 'postsUi',
    initialState: initialState,
    reducers: {
        fetchStarted: state => {
            state.error = '';
            state.isLoading = true;
        },
        fetched: (state, action: PayloadAction<Post[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        failed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const selectPostsUi = (state: RootState) => state.postsUi;
export const {fetchStarted, fetched, failed} = postsUiSlice.actions;
export default postsUiSlice.reducer;