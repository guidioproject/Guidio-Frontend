import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
	guidesData: {},
	activeGuide: {}
}
const guideSlice = createSlice({
	name: 'guide',
	initialState,
	reducers: {
		setGuides(state ,action) {
			state.guidesData = action.payload;
		},
		updateGuides(state, action) {
			state.guidesData.guides = [...state.guidesData.guides, ...action.payload];
		},
		setActiveGuide(state, action) {
			state.activeGuide = action.payload;
		},
		updateCoverImage(state, action) {
			state.activeGuide.coverImage = action.payload;
		},
		removeCoverImage(state) {
			state.activeGuide.coverImage = null;
		},
		filterActiveGuide(state) {
			state.guidesData.guides = state.guidesData.guides.filter(guide => guide.guideId !== state.activeGuide.guideId);
		},
		setError(state, action) {
			state.guideError = action.payload;
		}
	}
})

export const resetGuides = () => {
	return async dispatch => {
		dispatch(uiActions.setError(null));
		dispatch(uiActions.setLoading('guides'));
		dispatch(guideActions.setGuides({}));
	}
}

export default guideSlice;

export const guideActions = guideSlice.actions;


