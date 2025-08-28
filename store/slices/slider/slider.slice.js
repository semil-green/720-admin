import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allSliders: []
}

const sliderSlice = createSlice({
    name: "slider",
    initialState,
    reducers: {
        setSliders: (state, action) => {
            state.allSliders = action.payload
        },
        deleteSlider: (state, action) => {
            state.allSliders = state.allSliders.filter((slider) => slider.slider_id !== action.payload)
        }
    }
})

export const { setSliders, deleteSlider } = sliderSlice.actions

export default sliderSlice.reducer