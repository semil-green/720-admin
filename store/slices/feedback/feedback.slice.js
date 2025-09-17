import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginatedFeedback: [],
};

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setFeedback: (state, action) => {
            state.paginatedFeedback = action.payload;
        },
        addNewFeedback: (state, action) => {
            state.paginatedFeedback.unshift(action.payload)
        },
        updateFeedback: (state, action) => {
            const { feedback_id } = action.payload;
            state.paginatedFeedback = state.paginatedFeedback.map((item) => item.feedback_id === feedback_id ? action.payload : item);
        },
        deleteFeedback: (state, action) => {
            const idToDelete = action.payload;
            state.paginatedFeedback = state.paginatedFeedback.filter((item) => item.feedback_id !== idToDelete);
        },
    },
});

export const { setFeedback, addNewFeedback, updateFeedback, deleteFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;