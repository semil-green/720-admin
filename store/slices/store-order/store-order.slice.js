import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginatedStoresData: [],
};

const storeOrderSlice = createSlice({
    name: "storeOrder",
    initialState,
    reducers: {
        setStoreOrders: (state, action) => {
            state.paginatedStoresData = action.payload;
        },
        updateStoreOrderRequest: (state, action) => {
            const { id } = action.payload;
            state.paginatedStoresData = state.paginatedStoresData.map((item) =>
                item.id === id ? action.payload : item
            );
        },
    },
});

export const { setStoreOrders, updateStoreOrderRequest } = storeOrderSlice.actions;
export default storeOrderSlice.reducer;