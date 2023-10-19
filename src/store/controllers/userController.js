import { MESSAGE_ERROR_UNEXPECTED, MESSAGE_SUCCESS_ACCOUNT_DELETE, MESSAGE_SUCCESS_PW_CHANGE, MESSAGE_SUCCESS_USER_UPDATE, MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from "../messages";
import { showAlert } from "../slices/uiSlice";
import { userActions } from "../slices/userSlice";
import { getUserByToken } from "./authController";
import { sendRequest } from "./common/sendRequest";

export const deleteUser = (id, cb) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/users/${id}`, "DELETE");
			dispatch(userActions.removeUser());
			cb();
			dispatch(showAlert(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_ACCOUNT_DELETE));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const updateUser = (id, formData) => {
	return async (dispatch) => {
		try {
			const newUser = await sendRequest(`/users/${id}`, "PUT", formData);
			dispatch(userActions.setUser(newUser));
			dispatch(showAlert(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_USER_UPDATE));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const changePassword = (id, formData) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/users/${id}/update_password`, "PUT", formData);
			dispatch(showAlert(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_PW_CHANGE));
		} catch (error) {
			if (error.cause.status === 422)
				dispatch(showAlert(MESSAGE_TYPE_ERROR, error.cause.message.detail[0].msg));
			else if (error.cause.status === 400)
				dispatch(showAlert(MESSAGE_TYPE_ERROR, error.cause.message.detail));
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const getProfessionByName = (name) => {
	return async (dispatch) => {
		try {
			const data = await sendRequest(
				"/users/professions?name=" + name,
				"GET"
			);
			dispatch(userActions.updateProfessions(data));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const uploadImage = (file, type) => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/users/${type}`, 'POST', file, true);
			dispatch(userActions.setUser(data));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}

export const deleteImage = (type, cb) => {
	return async dispatch => {
		try {
			await sendRequest(`/users/${type}`, 'DELETE');
			cb();
			if (type === 'avatar')
				dispatch(userActions.removeAvatarImage());
			else
				dispatch(userActions.removeCoverImage());
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}
