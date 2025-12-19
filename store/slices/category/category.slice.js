import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginatedCategories: [],
    allCategories: [],
};

const categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers: {

        setPaginatedCategories: (state, action) => {
            state.paginatedCategories = action.payload;
        },

        addPaginatedCategory: (state, action) => {
            state.paginatedCategories.unshift(action.payload);
        },

        updatedPaginatedCategory: (state, action) => {
            state.paginatedCategories = state.paginatedCategories.map((category) =>
                category._id === action.payload._id ? action.payload : category
            );
        },

        updatedPaginatedCategoryStatus: (state, action) => {
            state.paginatedCategories = state.paginatedCategories.map((category) =>
                category._id === action.payload._id ? action.payload : category
            );
        },

        setAllCategories: (state, action) => {
            state.allCategories = action.payload;
        },

    },
});

export const { setPaginatedCategories, setAllCategories, addPaginatedCategory, updatedPaginatedCategoryStatus, updatedPaginatedCategory } = categorySlice.actions;
export default categorySlice.reducer;