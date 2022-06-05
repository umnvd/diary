import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import DateFilterConfig, { defaultDateFilterConfig } from '../../models/DateFilterConfig';
import Post from '../../models/Post'
import SortConfig, { sortOptions } from '../../models/SortConfig';
import { RootState } from '../store';

interface PostsState {
    posts: Post[],
    isLoading: boolean,
    error: string,
    currentPage: number,
    maxPage: number,
    sort: SortConfig,
    searchQuery: string,
    dateFilter: DateFilterConfig
}

const initialState: PostsState = {
    posts: [],
    isLoading: false,
    error: '',
    currentPage: 1,
    maxPage: 0,
    sort: {
        option: sortOptions[1].value,
        order: false
    },
    searchQuery: '',
    dateFilter: defaultDateFilterConfig,
}

const postsSlice = createSlice({
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
            console.log('fetched');
        },
        failed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        pageIncremented: state => {
            if (state.currentPage < state.maxPage) state.currentPage += 1;
        },
        maxPageReceived: (state, action: PayloadAction<number>) => {
            state.maxPage = action.payload;
        },
        sortChanged: (state, action: PayloadAction<SortConfig>) => {
            state.sort = action.payload;
            resetState(state);
        },
        dateFilterChanged: (state, action: PayloadAction<DateFilterConfig>) => {
            state.dateFilter = action.payload;
            resetState(state);
        },
        searchQueryChanged: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            resetState(state);
        },
        refreshed: (state) => {
            state.sort = {
                option: sortOptions[1].value,
                order: false
            }; // todo workaround
            resetState(state);
        }
    }
});

function resetState(state: WritableDraft<PostsState>) {
    state.posts = [];
    state.isLoading = false;
    state.error = '';
    state.currentPage = 1;
    state.maxPage = 0;
}

export const {
    fetchStarted,
    fetched,
    failed,
    pageIncremented,
    maxPageReceived,
    sortChanged,
    dateFilterChanged,
    searchQueryChanged,
    refreshed
} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;



