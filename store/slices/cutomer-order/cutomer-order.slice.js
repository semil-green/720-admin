import { createSlice } from "@reduxjs/toolkit";

const initialData = {
    paginatedCutomerOrdersData: [],
};

export const cutomerOrderSlice = createSlice({
    name: "cutomerOrder",
    initialState: initialData,
    reducers: {
        setCutomerOrders: (state, action) => {
            state.paginatedCutomerOrdersData = action.payload;
        },
    },
});

export const { setCutomerOrders } = cutomerOrderSlice.actions;

export default cutomerOrderSlice.reducer;