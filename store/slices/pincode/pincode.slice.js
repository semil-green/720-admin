import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allPincodes: []
}

const pincodeSlie = createSlice({
    name: "pincode",
    initialState,
    reducers: {
        getAllPincodes: (state, action) => {
            state.allPincodes = action.payload
        }
    }
})

export const { getAllPincodes } = pincodeSlie.actions
export default pincodeSlie.reducer  