import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCollections: [],
    allCollectionsData: []
};

const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        setCollections: (state, action) => {
            state.allCollections = action.payload;
        },
        setAllCollectionsData: (state, action) => {
            state.allCollectionsData = action.payload
        },
        deleteCollection: (state, action) => {
            state.allCollections = state.allCollections.filter(
                collection => collection.collection_id !== action.payload
            );
        },

    },
});

export const { setCollections, setAllCollectionsData, deleteCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;