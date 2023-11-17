import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	alert: { type: '', msgConf: { msg: '', pages: [] } },
	error: null,
	isLoading: false
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		showAlert(state, action) {
			const { type, msgConf } = action.payload;
			state.alert = { type, msgConf };
		},
		clearAlert(state, action) {
			state.alert = { type: '', msgConf: { msg: '', pages: [] } };
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

// export const showAlert = (type, msgObj) => {
// 	clearTimeout(alertTimeout);
// 	return async dispatch => {
// 			dispatch(uiActions.setAlert({type, msgObj}))
// 			alertTimeout = setTimeout(() => {
// 				dispatch(uiActions.setAlert({type: '',  msgObj: {msg: '', pages: []}}));
// 				alertTimeout = null;
// 			}, 3000);
// 	};
// };

// export const clearAlerts = () => {
// 	clearTimeout(alertTimeout);

// 	return async dispatch => {
// 		dispatch(uiActions.setAlert({type: '',  msgObj: {msg: '', pages: []}}));
// 	}
// }