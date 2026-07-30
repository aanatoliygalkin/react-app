import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const MOVIE_PERSISTENT_STATE = 'cartData';

export interface movieItem {
    id: number;
    title: string;
    image: string;
    rating: string;
}

export interface movieState {
    items: movieItem[];
}

const initialState: movieState = loadState<movieState>(MOVIE_PERSISTENT_STATE) ?? {
    items: []
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<movieItem>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index === -1) {
                state.items.push(action.payload);
            } else {
                state.items.splice(index, 1);
            }
        }
    }
});

export default movieSlice.reducer;
export const movieActions = movieSlice.actions;