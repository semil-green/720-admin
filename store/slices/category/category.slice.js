import { createSlice } from "@reduxjs/toolkit";

const initiealState = {
    allCategories: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState: initiealState,
    reducers: {
        setCategoriesData: (state, action) => {
            state.allCategories = action.payload;
        },
        addNewCategory: (state, action) => {
            state.allCategories.push(action.payload);
        },

        updateCategory: (state, action) => {
            const { category_id } = action.payload;

            state.allCategories = state.allCategories.map((item) =>
                item.category_id === category_id ? action.payload : item
            );
        },
        deleteCategory: (state, action) => {
            const idToDelete = action.payload;
            state.allCategories = state.allCategories.filter((item) => item.category_id !== idToDelete);
        },

    },
});

export const { setCategoriesData, addNewCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;