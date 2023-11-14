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
			state.alert= action.payload;
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

let alertTimeout;

export const showAlert = (type, msgObj) => {
	clearTimeout(alertTimeout);
	return async dispatch => {
			dispatch(uiActions.setAlert({type, msgObj}))
			alertTimeout = setTimeout(() => {
				dispatch(uiActions.setAlert({type: '',  msgObj: {msg: '', pages: []}}));
				alertTimeout = null;
			}, 3000);
	};
};

export const clearAlerts = () => {
	clearTimeout(alertTimeout);

	return async dispatch => {
		dispatch(uiActions.setAlert({type: '',  msgObj: {msg: '', pages: []}}));
	}
}

export const clearLoading = () => {
	return async dispatch => {
		await new Promise((res) => { setTimeout(() => { res() }, 500) });
		dispatch(uiActions.setIsLoading(false));
	}
}