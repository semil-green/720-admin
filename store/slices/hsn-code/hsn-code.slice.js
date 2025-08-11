import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allHsnCodes: [],
};

const hsnCodeSlice = createSlice({
    name: "hsnCode",
    initialState,
    reducers: {
        setHsnCodes: (state, action) => {
            state.allHsnCodes = action.payload;
        },
    },
});

export const { setHsnCodes } = hsnCodeSlice.actions;
export default hsnCodeSlice.reducer;