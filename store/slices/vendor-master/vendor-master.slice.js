import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allVendors: [],
    allVendorsData: [],
};

const vendorMasterSlice = createSlice({
    name: 'vendor-master',
    initialState,
    reducers: {
        setVendors: (state, action) => {
            state.allVendors = action.payload;
        },
        setAllVendorsData: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.allVendorsData = [...state.allVendorsData, ...action.payload];
            } else {
                state.allVendorsData = [...state.allVendorsData, action.payload];
            }
        },
        deleteVendor: (state, action) => {
            const idToDelete = action.payload;

            if (Array.isArray(state.allVendors.data)) {
                state.allVendors.data = state.allVendors.data.filter(
                    (vendor) => vendor.id !== idToDelete
                );
            }
        }

    },
});

export const { setVendors, setAllVendorsData, deleteVendor } = vendorMasterSlice.actions;
export default vendorMasterSlice.reducer;