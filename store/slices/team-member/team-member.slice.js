import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTeamMembersData: [],
};

const teamMemberSlice = createSlice({
    name: "teamMemberSlice",
    initialState,
    reducers: {
        setAllTeamMembersData: (state, action) => {
            state.allTeamMembersData = action.payload;
        },
        addNewTeamMember: (state, action) => {
            state.allTeamMembersData.unshift(action.payload);
        },
        updateTeamMember: (state, action) => {
            state.allTeamMembersData = state.allTeamMembersData.map((teamMember) => teamMember._id === action.payload._id ? action.payload : teamMember)
        },
        updateTeamMemberStatus: (state, action) => {
            state.allTeamMembersData = state.allTeamMembersData.map((teamMember) => teamMember._id === action.payload._id ? action.payload : teamMember)
        },
    },
});

export const { setAllTeamMembersData, addNewTeamMember, updateTeamMember, updateTeamMemberStatus } = teamMemberSlice.actions;
export default teamMemberSlice.reducer;