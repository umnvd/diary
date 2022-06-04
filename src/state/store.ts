import { configureStore } from '@reduxjs/toolkit';
import postsUiReducer from './posts/postsUiSlice';
import postsConfigReducer from './posts/postsConfigSlice';

const store = configureStore({
    reducer: {
        postsUi: postsUiReducer,
        postsConfig: postsConfigReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;