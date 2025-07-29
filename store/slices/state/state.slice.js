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
    }
})

export const { setAllStates } = stateSlice.actions
export default stateSlice.reducer
