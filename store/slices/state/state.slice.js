import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allStates: []
}

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        setAllStates: (state, action) => {
            state.allStates = action.payload
        },
        addNewState: (state, action) => {
            state.allStates.unshift(action.payload)
        },
        updateState: (state, action) => {
            const { id } = action.payload;
            state.allStates = state.allStates.map((item) =>
                item.id === id ? { ...item, ...action.payload } : item
            );
        },
        deleteState: (state, action) => {
            const idToDelete = action.payload;
            state.allStates = state.allStates.filter((item) => item.id !== idToDelete);
        }
    }
})

export const { setAllStates, addNewState, updateState, deleteState } = stateSlice.actions
export default stateSlice.reducer
