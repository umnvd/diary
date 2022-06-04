import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortConfig, sortOptions } from '../../models/Sort';
import { RootState } from '../store';

interface SortState {
    option: string
    order: boolean,
}

const initialState: SortState = {
    option: sortOptions[1].value,
    order: false
}

const sortSlice = createSlice({
    name: 'sort',
    initialState: initialState,
    reducers: {
        changed: (state, action: PayloadAction<SortConfig>) => {
            state.option = action.payload.option;
            state.order = action.payload.order;
            console.log(state);
        }
    }
});

export const selectSort = (state: RootState) => state.sort;
export const { changed } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;



