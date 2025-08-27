import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allItems: [],
    allItemsData: []
}

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        getAllItems: (state, action) => {
            state.allItems = action.payload
        },
        getAllItemsData: (state, action) => {
            state.allItemsData = action.payload
        },
        deleteItem: (state, action) => {
            const idToDelete = action.payload;
            state.allItems = state.allItems.filter(item => item.product_id !== idToDelete)
        }
    }
})

export const { getAllItems, getAllItemsData, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer