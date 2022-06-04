import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortConfig, sortOptions } from '../../models/Sort';
import { RootState } from '../store';

interface PostsConfigState {
    currentPage: number,
    maxPage: number,
    sort: SortConfig,
    // filter
}

const initialState: PostsConfigState = {
    currentPage: 1,
    maxPage: 0,
    sort: {
        option: sortOptions[1].value,
        order: false
    }
}

const postsConfigSlice = createSlice({
    name: 'postsConfig',
    initialState: initialState,
    reducers: {
        pageIncremented: state => {
            if (state.currentPage < state.maxPage) state.currentPage += 1;
        },
        maxPageReceived: (state, action: PayloadAction<number>) => {
            state.maxPage = action.payload;
        },
        sortChanged: (state, action: PayloadAction<SortConfig>) => {
            state.sort = action.payload;
        }
    }
});

export const {
    pageIncremented,
    maxPageReceived,
    sortChanged
} = postsConfigSlice.actions;

export const selectPostsConfig = (state: RootState) => state.postsConfig;
export default postsConfigSlice.reducer;



