import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paginatedDiscountData: []
}

const discountSlice = createSlice({
    name: "discount",
    initialState,
    reducers: {
        setAllDiscounts: (state, action) => {
            state.paginatedDiscountData = action.payload
        },
        deleteDiscount(state, action) {
            state.paginatedDiscountData = state.paginatedDiscountData.filter((item) => item.id !== action.payload);
        }
    }
})

export const { setAllDiscounts, deleteDiscount } = discountSlice.actions;
export default discountSlice.reducer