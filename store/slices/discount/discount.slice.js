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
            state.paginatedDiscountData = state.paginatedDiscountData.map((item) =>
                item.id === action.payload
                    ? { ...item, status: false }
                    : item
            );
        },
        activateDiscount(state, action) {
            state.paginatedDiscountData = state.paginatedDiscountData.map((item) =>
                item.id === action.payload
                    ? { ...item, status: true }
                    : item
            );
        },
    }
})

export const { setAllDiscounts, deleteDiscount, activateDiscount } = discountSlice.actions;
export default discountSlice.reducer