import messages from "../messages";
import { showAlert } from "../slices/uiSlice";
import { userActions } from "../slices/userSlice";
import { handleErrorMessages, sendRequest } from "./common/request";

export const loginUser = function (formData, cb) {
	return async (dispatch) => {
		try {
			const data = await sendRequest("/auth/login", "POST", formData);
			dispatch(userActions.setUser(data));
			cb();
			dispatch(showAlert('success', messages.success['login_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const logoutUser = function (cb) {
	return async (dispatch) => {
		try {
			await sendRequest("/auth/logout", "POST");
			dispatch(userActions.removeUser());
			cb();
			dispatch(showAlert('success', messages.success['logout_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const registerUser = function (formData, cb) {
	return async (dispatch) => {
		try {
			await sendRequest("/auth/register", "POST", formData);
			cb();
			dispatch(showAlert('success', messages.success['register_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const getUserByToken = function () {
	return async (dispatch) => {
		try {
			const data = await sendRequest("/auth/token", "GET");
			dispatch(userActions.setUser(data));
		} catch (err) {
			dispatch(userActions.setUser(null));
			dispatch(showAlert('error', messages.error[err.message]));
		}
	};
};
