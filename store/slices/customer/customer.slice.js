import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginatedCustomersData: []
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomers: (state, action) => {
            state.paginatedCustomersData = action.payload
        }
    }
})

export const { setCustomers } = customerSlice.actions
export default customerSlice.reducer