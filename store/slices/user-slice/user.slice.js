import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    editUserData: {}
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setAllUSers: (state, action) => {
            state.users = action.payload
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        editUserData: (state, action) => {
            state.editUserData = action.payload
        },
        updatedUserData: (state, action) => {
            state.users = state.users.map((user) => user.id === action.payload.data.id ? action.payload.data : user)
        },
        deleteUserData: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload)
        }
    },
});

export const { setAllUSers, addUser, editUserData, updatedUserData, deleteUserData } = userSlice.actions;
export default userSlice.reducer;
