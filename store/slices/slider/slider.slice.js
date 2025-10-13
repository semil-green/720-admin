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
        },
        updateSliderStatus: (state, action) => {
            state.allSliders = state.allSliders.map((slider) => {
                if (slider.slider_id === action.payload.slider_id) {
                    return {
                        ...slider,
                        status: !slider.status,
                    };
                }
                return slider;
            });
        }

    }
})

export const { setSliders, deleteSlider, updateSliderStatus } = sliderSlice.actions

export default sliderSlice.reducer