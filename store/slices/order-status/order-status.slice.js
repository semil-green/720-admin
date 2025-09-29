import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allOrderStatus: []
}

const orderStatusSlice = createSlice({
    name: "orderStatus",
    initialState,
    reducers: {
        setOrderStatus: (state, action) => {
            state.allOrderStatus = action.payload
        }
    }
})


export const { setOrderStatus } = orderStatusSlice.actions
export default orderStatusSlice.reducer
