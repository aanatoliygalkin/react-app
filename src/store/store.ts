import { configureStore } from "@reduxjs/toolkit";
import { MOVIE_PERSISTENT_STATE, movieSlice } from "./movie.slice";
import { saveState } from "./storage";

export const store = configureStore({
    reducer: {
        movie: movieSlice.reducer
    }
});

store.subscribe(()=>{
    saveState(store.getState().movie, MOVIE_PERSISTENT_STATE);
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;