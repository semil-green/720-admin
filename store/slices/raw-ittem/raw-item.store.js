import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRawItems: [],
};

const rawItemSlice = createSlice({
    name: "rawItem",
    initialState,
    reducers: {
        setRawItems: (state, action) => {
            state.allRawItems = action.payload;
        },
        addNewRawItem: (state, action) => {
            state.allRawItems.unshift(action.payload);
        },
        updateRawItem: (state, action) => {
            const { raw_item_id } = action.payload;
            state.allRawItems = state.allRawItems.map((item) => item.raw_id === raw_item_id ? action.payload : item);
        },
        deleteRawItem: (state, action) => {
            const id = action.payload;
            state.allRawItems = state.allRawItems.filter((item) => item.raw_id !== id);
        }
    },
});

export const { setRawItems, addNewRawItem, updateRawItem, deleteRawItem } = rawItemSlice.actions;
export default rawItemSlice.reducer;