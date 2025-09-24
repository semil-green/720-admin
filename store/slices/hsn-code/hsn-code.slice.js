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
        addHsnCode: (state, action) => {
            state.allHsnCodes.unshift(action.payload)
        },
        updateHsnCode: (state, action) => {
            const { hsn_id } = action.payload;
            state.allHsnCodes = state.allHsnCodes.map((item) => item.hsn_id === hsn_id ? action.payload : item);
        },
        deleteHsnCode: (state, action) => {
            const idToDelete = action.payload;
            state.allHsnCodes = state.allHsnCodes.filter((item) => item.hsn_id !== idToDelete);
        }
    },
});

export const { setHsnCodes, addHsnCode, updateHsnCode, deleteHsnCode } = hsnCodeSlice.actions;
export default hsnCodeSlice.reducer;