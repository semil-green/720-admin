import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCollections: [],
};

const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        setCollections: (state, action) => {
            state.allCollections = action.payload;
        },
        deleteCollection: (state, action) => {
            state.allCollections = state.allCollections.filter(
                collection => collection.collection_id !== action.payload
            );
        },

    },
});

export const { setCollections, deleteCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;