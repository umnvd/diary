import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './posts/postsReducer';
import { sortReducer } from './sort/sortReducer';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        sort: sortReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;