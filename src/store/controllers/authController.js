import messages from "../messages";
import { uiActions } from "../slices/uiSlice";
import { userActions } from "../slices/userSlice";
import { handleErrorMessages, sendRequest } from "./common/request";

export const loginUser = function (formData, cb) {
	return async (dispatch) => {
		try {
			const data = await sendRequest("/auth/login", "POST", formData, dispatch);
			dispatch(userActions.setUser(data));
			cb();
			dispatch(uiActions.showAlert({type: 'success', msgConf: messages.success['login_success']}));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const logoutUser = function (cb) {
	return async (dispatch) => {
		try {
			await sendRequest("/auth/logout", "POST", null, dispatch);
			dispatch(userActions.removeUser());
			cb();
			dispatch(uiActions.showAlert({type: 'success', msgConf: messages.success['logout_success']}));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const registerUser = function (formData, cb) {
	return async (dispatch) => {
		try {
			await sendRequest("/auth/register", "POST", formData, dispatch);
			cb();
			dispatch(uiActions.showAlert({type: 'success', msgConf: messages.success['register_success']}));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const getUserByToken = function () {
	return async (dispatch) => {
		try {
			const data = await sendRequest("/auth/token", "GET", null, dispatch);
			dispatch(userActions.setUser(data));
		} catch (err) {
			if (document.cookie.startsWith('auth_token'))
				document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			dispatch(userActions.removeUser());
			dispatch(uiActions.showAlert({type: 'error', msgConf: messages.error[err.message]}));
		}
	};
};
