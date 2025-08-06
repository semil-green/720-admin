import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allVendors: [],
};

const vendorMasterSlice = createSlice({
    name: 'vendor-master',
    initialState,
    reducers: {
        setVendors: (state, action) => {
            state.allVendors = action.payload;
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

export const { setVendors, deleteVendor } = vendorMasterSlice.actions;
export default vendorMasterSlice.reducer;