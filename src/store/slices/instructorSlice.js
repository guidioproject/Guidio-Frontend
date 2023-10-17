import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
	instructorsData: {},
	activeInstructor: null
};

const instructorSlice = createSlice({
	name: 'instructor',
	initialState,
	reducers: {
		setActiveInstructor(state, action) {
			state.activeInstructor = action.payload;
		},
		setInstructors(state, action) {
			state.instructorsData = action.payload;
		},
		updateInstructors(state, action) {
			state.instructorsData.instructors = [...state.instructorsData.instructors, ...action.payload];
		}
	}
});

export const resetInstructors = () => {
	return async dispatch => {
		dispatch(uiActions.setError(null));
		dispatch(uiActions.setIsLoading(true));
		dispatch(instructorActions.setInstructors({}));
	}
}

export default instructorSlice;

export const instructorActions = instructorSlice.actions;