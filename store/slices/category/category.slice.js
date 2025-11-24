import { createSlice } from "@reduxjs/toolkit";

const initiealState = {
    allCategories: [],
    totalCategoriesCount: 0
};

const categorySlice = createSlice({
    name: "category",
    initialState: initiealState,
    reducers: {
        setCategoriesData: (state, action) => {
            state.allCategories = action.payload.data
            state.totalCategoriesCount = action.payload.total
        },
        addNewCategory: (state, action) => {
            state.allCategories.unshift(action.payload)

        },

        updateCategory: (state, action) => {
            const { category_id } = action.payload;

            state.allCategories = state.allCategories.map((item) =>
                item.category_id === category_id ? action.payload : item
            );
        },
        deleteCategory: (state, action) => {
            const idToDelete = action.payload;
            state.allCategories = state.allCategories.map((item) =>
                item.category_id === idToDelete
                    ? { ...item, status: false }
                    : item
            );
        },
        activateCategory: (state, action) => {
            const updatedCategory = action.payload;

            state.allCategories = state.allCategories.map((item) =>
                item.category_id === updatedCategory.category_id
                    ? { ...item, ...updatedCategory }
                    : item
            );
        }

    },
});

export const { setCategoriesData, addNewCategory, updateCategory, deleteCategory, activateCategory } = categorySlice.actions;
export default categorySlice.reducer;