import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allInwardMaterials: [],
};

const inwardMaterialSlice = createSlice({
    name: "inwardMaterial",
    initialState,
    reducers: {
        getAllInwardMaterials: (state, action) => {
            state.allInwardMaterials = action.payload;
        },
        deleteInwardMaterial: (state, action) => {
            const idToDelete = action.payload;
            state.allInwardMaterials = state.allInwardMaterials.filter((item) => item.inwardmaterial_id !== idToDelete);
        },
    },
});

export const { getAllInwardMaterials, deleteInwardMaterial } = inwardMaterialSlice.actions;
export default inwardMaterialSlice.reducer;