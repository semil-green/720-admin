import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allCities: [],
    paginatedCityData: []
}

const citySLice = createSlice({
    name: "city",
    initialState,
    reducers: {
        setAllCities: (state, action) => {
            state.allCities = action.payload
        },
        setPaginatedCityData: (state, action) => {
            state.paginatedCityData = action.payload
        },
        addNewPaginatedCityData: (state, action) => {
            state.paginatedCityData.unshift(action.payload)
        },
        updatedPaginatedCity: (state, action) => {
            const { id } = action.payload;
            state.paginatedCityData = state.paginatedCityData.map((item) => item.id === id ? action.payload : item);
        },
        updateCity: (state, action) => {
            const { city_id } = action.payload;
            state.allCities = state.allCities.map((item) => item.city_id === city_id ? action.payload : item);
        },
        deleteCity: (state, action) => {
            state.paginatedCityData = state.paginatedCityData.filter((item) => item.id !== action.payload);
        }
    }
})

export const { setAllCities, setPaginatedCityData, updateCity, deleteCity, addNewPaginatedCityData, updatedPaginatedCity } = citySLice.actions
export default citySLice.reducer