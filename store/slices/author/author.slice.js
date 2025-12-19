import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginatedAuthors: [],
    allAuthors: [],
};


const authorSlice = createSlice({
    name: "authorSlice",
    initialState,
    reducers: {
        setPaginatedAuthors: (state, action) => {
            state.paginatedAuthors = action.payload;
        },
        setAllAuthors: (state, action) => {
            state.allAuthors = action.payload;
        },
    },
});

export const { setPaginatedAuthors, setAllAuthors } = authorSlice.actions;
export default authorSlice.reducer;