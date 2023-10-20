import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeUser: null,
	professions: []
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.activeUser = action.payload;
		},
		removeUser(state) {
			state.activeUser = null;
		},
		updateProfessions(state, action) {
			state.professions = action.payload;
		},
		removeCoverImage(state) {
			state.activeUser.userDetails.coverImage = null;
		},
		removeAvatarImage(state) {
			state.activeUser.userDetails.avatar = null;
		}
	},
});

export default userSlice;
export const userActions = userSlice.actions;

