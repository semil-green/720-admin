import { createSlice } from "@reduxjs/toolkit";

const initialDara = {
    alltagsData: []
}

const tagsSlice = createSlice({
    name: "tags",
    initialState: initialDara,
    reducers: {
        setTags: (state, action) => {
            state.alltagsData = action.payload
        },
        addNewTag: (state, action) => {
            state.alltagsData.unshift(action.payload)
        }
    }
})

export const { setTags, addNewTag } = tagsSlice.actions;
export default tagsSlice.reducer