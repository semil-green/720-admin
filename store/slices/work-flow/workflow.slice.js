import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allWorkFlows: [],
};

const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        setWorkFlows: (state, action) => {
            state.allWorkFlows = action.payload;
        },
        deleteWorkFlow: (state, action) => {
            const idToDelete = action.payload;
            state.allWorkFlows = {
                ...state.allWorkFlows,
                data: state.allWorkFlows.data.filter(
                    (item) => item.workflow_id !== idToDelete
                ),
                total_count: state.allWorkFlows.total_count - 1
            };
        }
    },
});

export const { setWorkFlows, deleteWorkFlow } = workflowSlice.actions;
export default workflowSlice.reducer;