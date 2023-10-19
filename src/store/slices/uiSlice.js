import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	alert: {type: '', msgObj: {msg: '', pages: []}},
	error: null,
	isLoading: false
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setAlert(state, action) {
			state.alert = action.payload;
		},
		setError(state, action) {
			state.error = action.payload;
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		}
	}
});

export const uiActions = uiSlice.actions;

export default uiSlice;

let timeout;

export const showAlert = (type, msgObj) => {
	clearTimeout(timeout);
	return async dispatch => {
			dispatch(uiActions.setAlert({type, msgObj}))
			timeout = setTimeout(() => {
				dispatch(uiActions.setAlert({type: '',  msgObj: {msg: '', pages: []}}));
				timeout = null;
			}, 3000);
	};
};

export const clearAlerts = () => {
	clearTimeout(timeout);

	return async dispatch => {
		dispatch(uiActions.setAlert({type: '',  msgObj: {msg: '', pages: []}}));
	}
}