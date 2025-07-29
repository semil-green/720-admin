import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allCities: []
}

const citySLice = createSlice({
    name: "city",
    initialState,
    reducers: {
        setAllCities: (state, action) => {
            state.allCities = action.payload
        }
    }
})

export const { setAllCities } = citySLice.actions
export default citySLice.reducer