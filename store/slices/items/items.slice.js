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
        clearAllItemsData: (state) => {
            state.allItemsData = []
        },
        deleteItem: (state, action) => {
            const idToDelete = action.payload;
            state.allItems = state.allItems.map(item =>
                item.product_id === idToDelete ? { ...item, status: false } : item
            );
            state.allItemsData = state.allItemsData.filter(item => item.product_id !== idToDelete)
        }
    }
})

export const { getAllItems, getAllItemsData, deleteItem, clearAllItemsData } = itemsSlice.actions;
export default itemsSlice.reducer