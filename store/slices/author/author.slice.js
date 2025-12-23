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
        },
        updateAllAuthorsStatus: (state, action) => {
            if (state.allAuthors.length > 0) {
                state.allAuthors = state.allAuthors.map((author) => author._id === action.payload._id ? action.payload : author)
            }
        }
    },
});

export const { setPaginatedAuthors, setAllAuthors, updatePaginatedAuthor, addNewPaginatedAuthor, updatePaginatedAuthorStatus, updateAllAuthorsStatus } = authorSlice.actions;
export default authorSlice.reducer;