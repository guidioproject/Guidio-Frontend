import { MESSAGE_ERROR_UNEXPECTED, MESSAGE_SUCCESS_ACCOUNT_DELETE, MESSAGE_SUCCESS_PW_CHANGE, MESSAGE_SUCCESS_USER_UPDATE, MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from "../constants";
import { showMessage, uiActions } from "../slices/uiSlice";
import { userActions } from "../slices/userSlice";
import { getUserByToken } from "./authController";
import { sendRequest } from "./common/sendRequest";

export const deleteUser = (id, cb) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/users/${id}`, "DELETE");
			dispatch(userActions.removeUser());
			cb();
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_ACCOUNT_DELETE));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const updateUser = (id, formData) => {
	return async (dispatch) => {
		try {
			const newUser = await sendRequest(`/users/${id}`, "PUT", formData);
			dispatch(userActions.setUser(newUser));
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_USER_UPDATE));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const changePassword = (id, formData) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/users/${id}/update_password`, "PUT", formData);
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_PW_CHANGE));
		} catch (error) {
			if (error.cause.status === 422)
				dispatch(showMessage(MESSAGE_TYPE_ERROR, error.cause.message.detail[0].msg));
			else if (error.cause.status === 400)
				dispatch(showMessage(MESSAGE_TYPE_ERROR, error.cause.message.detail));
			else
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
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
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
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
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
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
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}

export const getInstructors = (page) => {
	return async dispatch => {
		try {
			dispatch(uiActions.setIsLoading(true));
			const data = await sendRequest(`/users/instructors?page=${page}&page_size=12`, 'GET');
			await new Promise(res => setTimeout(() => { res() }, 500));
			dispatch(uiActions.setIsLoading(false));
			console.log(data);
			dispatch(userActions.setInstructors(data));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			await new Promise(res => setTimeout(() => { res() }, 500));
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const getUserById = id => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/users/${id}`, 'GET');
			dispatch(userActions.setPreviewedUser(data));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}
