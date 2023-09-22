import { MESSAGE_ERROR_LOGIN, MESSAGE_ERROR_SESSION_EXPIRED, MESSAGE_ERROR_UNEXPECTED, MESSAGE_ERROR_WRONG_EMAIL, MESSAGE_SUCCESS_LOGIN, MESSAGE_SUCCESS_LOGOUT, MESSAGE_SUCCESS_REGISTER, MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS, REGISTER_ERRORS } from "../constants";
import { showMessage } from "../slices/uiSlice";
import { userActions } from "../slices/userSlice";

import { sendRequest } from "./common/sendRequest";

export const loginUser = function (formData, cb) {
	return async (dispatch) => {
		try {
			const data = await sendRequest("/auth/login", "POST", formData);
			dispatch(userActions.setUser(data));
			cb();
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_LOGIN));
		} catch (err) {
			const {status} = err.cause;
			if (status === 422) {
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_WRONG_EMAIL));
				return;
			}
			else if (status === 401) {
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_LOGIN))
				return;
			}
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const logoutUser = function (cb) {
	return async (dispatch) => {
		try {
			await sendRequest("/auth/logout", "POST");
			dispatch(userActions.removeUser());
			cb();
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_LOGOUT));
		} catch (err) {
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const registerUser = function (formData, cb) {
	return async (dispatch) => {
		try {
			await sendRequest("/auth/register", "POST", formData);
			cb();
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_REGISTER));
		} catch (err) {
			const status = err.cause.status;
			if (status === 422) {
				const { type, msg } = err.cause.message.detail.at(-1);
				if (REGISTER_ERRORS[type])
					dispatch(showMessage(MESSAGE_TYPE_ERROR, REGISTER_ERRORS[type]));

				if (type === "value_error")
					dispatch(showMessage(MESSAGE_TYPE_ERROR, `Error! ${msg}`));

				if (!type)
					dispatch(showMessage(MESSAGE_TYPE_ERROR, `Error! ${err.detail}`));
				return;
			}
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
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
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_SESSION_EXPIRED));
		}
	};
};
