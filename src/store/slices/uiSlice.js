import { createSlice } from '@reduxjs/toolkit';
import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from '../constants';

const initialState = {
	errorMsg: '',
	successMsg: '',
	isLoading: false
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setError(state, action) {
			state.errorMsg = action.payload;
		},
		setSuccess(state, action) {
			state.successMsg = action.payload;
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		}
	}
});

export const uiActions = uiSlice.actions;

export default uiSlice;

let timeout;

export const showMessage = (type, msg) => {
	clearTimeout(timeout);
	return async dispatch => {
		if (type === MESSAGE_TYPE_ERROR) {
			dispatch(uiActions.setSuccess(''));
			dispatch(uiActions.setError(msg));
			timeout = setTimeout(() => {
				dispatch(uiActions.setError(''));
				timeout = null;
			}, 4000);
		}
		if (type === MESSAGE_TYPE_SUCCESS) {
			dispatch(uiActions.setError(''));
			dispatch(uiActions.setSuccess(msg));
			setTimeout(() => {
				dispatch(uiActions.setSuccess(''));
			timeout = null;
		}, 4000);
		}
	};
};

export const clearMessages = () => {
	clearTimeout(timeout);

	return async dispatch => {
		dispatch(uiActions.setError(''));
		dispatch(uiActions.setSuccess(''));
	}
}