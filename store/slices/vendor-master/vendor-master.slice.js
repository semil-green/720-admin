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
            state.allVendorsData = action.payload;
        },
        addNewVendorsData: (state, action) => {
            const exists = state.allVendorsData.find(v => v.id === action.payload.id);
            if (!exists) {
                state.allVendorsData.unshift(action.payload);
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

export const { setVendors, setAllVendorsData, addNewVendorsData, deleteVendor } = vendorMasterSlice.actions;
export default vendorMasterSlice.reducer;