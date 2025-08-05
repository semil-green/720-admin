import { createSlice } from "@reduxjs/toolkit";
import { all } from "axios";

const initialState = {
    allPincodeswiseSlots: [],
    allDarkStorePackagingCenter: [],
}

const picodeWiseSlotSlice = createSlice({
    name: "picode-wise-slot",
    initialState,
    reducers: {
        getAllPincodesWiseSlot: (state, action) => {
            state.allPincodeswiseSlots = action.payload
        },
        allDarkStorePackagingCenter: (state, action) => {
            state.allDarkStorePackagingCenter = action.payload
        },
        addnewPincodeSlot: (state, action) => {
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.allPincodeswiseSlots = [...state.allPincodeswiseSlots, ...newData];
        },
        updatePincodeSlot: (state, action) => {
            const { id, data } = action.payload;
            state.allPincodeswiseSlots = state.allPincodeswiseSlots.map((item) => item.id === id ? data : item);
        },
        deletePincodeSlot: (state, action) => {
            const idToDelete = action.payload;
            state.allPincodeswiseSlots = state.allPincodeswiseSlots.filter((item) => item.id !== idToDelete);
        },
    }
})

export const { getAllPincodesWiseSlot, allDarkStorePackagingCenter, addnewPincodeSlot, updatePincodeSlot, deletePincodeSlot } = picodeWiseSlotSlice.actions;
export default picodeWiseSlotSlice.reducer