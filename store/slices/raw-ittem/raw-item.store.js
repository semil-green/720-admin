import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRawItems: [],
    allRawItemsData: []
};

const rawItemSlice = createSlice({
    name: "rawItem",
    initialState,
    reducers: {
        setRawItems: (state, action) => {
            state.allRawItems = action.payload;
        },
        setAllRawItems: (state, action) => {
            state.allRawItemsData = action.payload;
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
            state.allRawItems = state.allRawItems.map(item =>
                item.raw_id === id ? { ...item, status: false } : item
            );
        },
        activateRawItem: (state, action) => {
            const id = action.payload;
            state.allRawItems = state.allRawItems.map(item =>
                item.raw_id === id ? { ...item, status: true } : item
            );
        }
    },
});

export const { setRawItems, setAllRawItems, addNewRawItem, updateRawItem, deleteRawItem, activateRawItem } = rawItemSlice.actions;
export default rawItemSlice.reducer;