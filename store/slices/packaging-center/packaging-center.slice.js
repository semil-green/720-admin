import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    packagingCenters: [],
    allPackagingCenters: []
};

const packagingCenterSlice = createSlice({
    name: 'packagingCenters',
    initialState,
    reducers: {
        setPackagingCenter: (state, action) => {
            state.packagingCenters = action.payload;
        },
        setAllPackagingCenter: (state, action) => {
            state.allPackagingCenters = action.payload;
        },
        addPackagingCenter: (state, action) => {
            state.packagingCenters.push(action.payload);
        },
        deletePackagingCenter: (state, action) => {
            const idToDelete = action.payload;
            state.packagingCenters = state.packagingCenters.filter(store => store.id !== idToDelete);
        },
        addPincodeToPackagingCenter: (state, action) => {
            const { storeId, pincodeData } = action.payload;

            const store = state.packagingCenters.find(item => item.id === storeId);
            if (store) {
                if (!Array.isArray(store.pincodes)) {
                    store.pincodes = [];
                }

                const newPincodes = Array.isArray(pincodeData) ? pincodeData : [pincodeData];
                store.pincodes = [...store.pincodes, ...newPincodes];
            }
        },
        updatePincodeInPackagingCenter: (state, action) => {
            const { storeId, updatedPincode } = action.payload;
            const store = state.packagingCenters.find(store => store.id === storeId);
            if (store && Array.isArray(store.pincodes)) {
                const index = store.pincodes.findIndex(p => p.id === updatedPincode.id);
                if (index !== -1) {
                    store.pincodes[index] = updatedPincode;
                }
            }
        },
        deletePincodeFromPackagingCenter: (state, action) => {
            const { storeId, pincodeId } = action.payload;

            const store = state.packagingCenters.find(s => s.id === storeId);
            if (store && Array.isArray(store.pincodes)) {
                store.pincodes = store.pincodes.filter(p => p.id !== pincodeId);
            }
        }

    }
});

export const {
    setPackagingCenter,
    setAllPackagingCenter,
    addPackagingCenter,
    deletePackagingCenter,
    addPincodeToPackagingCenter,
    updatePincodeInPackagingCenter,
    deletePincodeFromPackagingCenter
} = packagingCenterSlice.actions;

export default packagingCenterSlice.reducer;
