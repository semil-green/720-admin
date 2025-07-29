import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

const roleMasterSlice = createSlice({
    name: 'role-master',
    initialState,
    reducers: {
        setRoles: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setRoles, clearRoles } = roleMasterSlice.actions;
export default roleMasterSlice.reducer;