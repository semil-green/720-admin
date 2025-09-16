import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginatedRawItemsData: [],
    paginatedFinishedProductData: []
}

const inventoriesSlice = createSlice({
    name: "inventories",
    initialState,
    reducers: {
        setPaginatedRawItemsData: (state, action) => {
            state.paginatedRawItemsData = action.payload;
        },
        setPaginatedFinishedProductData: (state, action) => {
            state.paginatedFinishedProductData = action.payload;
        }
    }
})

export const { setPaginatedRawItemsData, setPaginatedFinishedProductData } = inventoriesSlice.actions
export default inventoriesSlice.reducer