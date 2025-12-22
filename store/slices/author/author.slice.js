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
        addNewPaginatedAuthor: (state, action) => {
            state.paginatedAuthors.unshift(action.payload);
        },
        updatePaginatedAuthor: (state, action) => {
            state.paginatedAuthors = state.paginatedAuthors.map((author) => author._id === action.payload._id ? action.payload : author)
        },
        updatePaginatedAuthorStatus: (state, action) => {
            state.paginatedAuthors = state.paginatedAuthors.map((author) => author._id === action.payload._id ? action.payload : author)
        },
        setAllAuthors: (state, action) => {
            state.allAuthors = action.payload;
        }
    },
});

export const { setPaginatedAuthors, setAllAuthors, updatePaginatedAuthor, addNewPaginatedAuthor, updatePaginatedAuthorStatus } = authorSlice.actions;
export default authorSlice.reducer;