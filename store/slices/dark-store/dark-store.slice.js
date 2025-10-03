import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkStores: [],
    allDarkStoresOfUser: [],
    allDarkStores: [],
    darkStorePaginatedPincodes: []
};

const darkStoreSlice = createSlice({
    name: 'darkStore',
    initialState,
    reducers: {
        setDarkStores: (state, action) => {
            state.darkStores = action.payload;
        },
        setAllDarkStoresOfUser: (state, action) => {
            state.allDarkStoresOfUser = action.payload
        },
        setAllDarkStores: (state, action) => {
            state.allDarkStores = action.payload
        },
        setDarkStorePaginatedPincodeData: (state, action) => {
            state.darkStorePaginatedPincodes = action.payload
        },
        updateDarkStorePaginatedPincodeData: (state, action) => {
            const updatedPincode = action.payload;
            state.darkStorePaginatedPincodes = state.darkStorePaginatedPincodes.map((item) =>
                item.id === updatedPincode.id ? { ...item, ...updatedPincode } : item
            );
        },
        addDarkStorePaginatedPincodeData: (state, action) => {
            state.darkStorePaginatedPincodes = [
                ...state.darkStorePaginatedPincodes,
                action.payload.pincodeData
            ];
        },
        addDarkStore: (state, action) => {
            state.darkStores.push(action.payload);
        },
        deleteDarkStore: (state, action) => {
            const idToDelete = action.payload;
            state.darkStores = state.darkStores.filter(store => store.id !== idToDelete);
        },
        addPincodeToDarkStore: (state, action) => {
            const { storeId, pincodeData } = action.payload;

            const store = state.darkStores.find(item => item.id === storeId);
            if (store) {
                if (!Array.isArray(store.pincodes)) {
                    store.pincodes = [];
                }
                const newPincodes = Array.isArray(pincodeData) ? pincodeData : [pincodeData];

                store.pincodes = [...store.pincodes, ...newPincodes];
            }
        },
        updatePincodeInDarkStore: (state, action) => {
            const { storeId, updatedPincode } = action.payload;
            const store = state.darkStores.find(store => store.id === storeId);
            if (store && Array.isArray(store.pincodes)) {
                const index = store.pincodes.findIndex(p => p.id === updatedPincode.id);
                if (index !== -1) {
                    store.pincodes[index] = updatedPincode;
                }
            }
        },

        deletePincodeFromDarkStore: (state, action) => {
            const { storeId, pincodeId } = action.payload;

            const store = state.darkStores.find(s => s.id === storeId);
            if (store && Array.isArray(store.pincodes)) {
                store.pincodes = store.pincodes.filter(p => p.id !== pincodeId);
            }
        }


    }
});

export const {
    setDarkStores,
    setAllDarkStoresOfUser,
    setAllDarkStores,
    setDarkStorePaginatedPincodeData,
    addDarkStorePaginatedPincodeData,
    addDarkStore,
    deleteDarkStore,
    addPincodeToDarkStore,
    updatePincodeInDarkStore,
    deletePincodeFromDarkStore,
    updateDarkStorePaginatedPincodeData
} = darkStoreSlice.actions;

export default darkStoreSlice.reducer;
