import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginatedOrderRequest: []
}

const orderRequestSlice = createSlice({
    name: "orderRequest",
    initialState,
    reducers: {
        getAllOrderRequests: (state, action) => {
            state.paginatedOrderRequest = action.payload
        },
        deleteOrderRequest: (state, action) => {
            state.paginatedOrderRequest = state.paginatedOrderRequest.filter((item) => item.id !== action.payload)
        },
        addNewOrderRequest: (state, action) => {
            state.paginatedOrderRequest.unshift(action.payload)
        },
        updateOrderRequest: (state, action) => {
            const { id } = action.payload;
            state.paginatedOrderRequest = state.paginatedOrderRequest.map((item) => item.id === id ? action.payload : item);
        },
    }
})

export const { getAllOrderRequests, deleteOrderRequest, addNewOrderRequest, updateOrderRequest } = orderRequestSlice.actions;
export default orderRequestSlice.reducer