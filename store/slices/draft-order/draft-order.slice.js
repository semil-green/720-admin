import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paginatedDraftOrders: []
}

const draftOrderSlice = createSlice({
    name: "draftOrder",
    initialState,
    reducers: {
        setDraftOrders: (state, action) => {
            state.paginatedDraftOrders = action.payload
        }
    }
})

export const { setDraftOrders } = draftOrderSlice.actions;
export default draftOrderSlice.reducer