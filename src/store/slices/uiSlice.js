import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	alert: { type: '', msgConf: { msg: '', pages: [] } },
	error: null,
	loading: null
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		showAlert(state, action) {
			const { type, msgConf } = action.payload;
			state.alert = { type, msgConf };
		},
		clearAlert(state) {
			state.alert = { type: '', msgConf: { msg: '', pages: [] } };
		},
		setError(state, action) {
			state.error = action.payload;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		}
	}
});

export const uiActions = uiSlice.actions;

export default uiSlice;