import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allDarkStorePackagingCenter: []
}

const darkStore_packagingCenter_slice = createSlice({
    name: "darkStore_packagingCenter",
    initialState,
    reducers: {
        setAllDarkStorePackagingCenter: (state, action) => {
            state.allDarkStorePackagingCenter = action.payload
        },
        addDarkStorePackagingCenter: (state, action) => {
            if (state.allDarkStorePackagingCenter?.data) {
                state.allDarkStorePackagingCenter.data.push(action.payload);
            }
        },
        deleteDarkStorePackagingCenter: (state, action) => {
            const idToDelete = action.payload;
            if (state.allDarkStorePackagingCenter?.data) {
                state.allDarkStorePackagingCenter.data = state.allDarkStorePackagingCenter.data.filter(
                    (store) => store.id !== idToDelete
                );
            }
        },
        addPincodeToDarkStore: (state, action) => {
            const { storeId, pincodeData } = action.payload;
            const store = state.allDarkStorePackagingCenter?.data?.find(item => item.id === storeId);
            if (store) {
                if (!Array.isArray(store.pincodes)) {
                    store.pincodes = [];
                }
                store.pincodes.push(pincodeData);
            }
        },
        updatePincodeInDarkStorePackagingCenter: (state, action) => {
            const { storeId, updatedPincode } = action.payload;

            const store = state.allDarkStorePackagingCenter?.data?.find(store => store.id === storeId);

            if (store && Array.isArray(store.pincodes)) {
                const index = store.pincodes.findIndex(p => p.id === updatedPincode.id);
                if (index !== -1) {
                    store.pincodes[index] = updatedPincode;
                }
            }
        },
        deletePincodeFromDarkStorePackagingCenter: (state, action) => {
            const { storeId, pincodeId } = action.payload;
            const store = state.allDarkStorePackagingCenter?.data?.find(s => s.id === storeId);
            if (store && Array.isArray(store.pincodes)) {
                store.pincodes = store.pincodes.filter(p => p.id !== pincodeId);
            }
        }
    }
})

export const { setAllDarkStorePackagingCenter, addDarkStorePackagingCenter, deleteDarkStorePackagingCenter, addPincodeToDarkStore, updatePincodeInDarkStorePackagingCenter, deletePincodeFromDarkStorePackagingCenter } = darkStore_packagingCenter_slice.actions;

export default darkStore_packagingCenter_slice.reducer 