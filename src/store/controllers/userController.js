import { MESSAGE_ERROR_UNEXPECTED, MESSAGE_SUCCESS_ACCOUNT_DELETE, MESSAGE_SUCCESS_PW_CHANGE, MESSAGE_SUCCESS_USER_UPDATE, MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from "../constants";
import { showMessage, uiActions } from "../slices/uiSlice";
import { userActions } from "../slices/userSlice";
import { logoutUser } from "./authController";
import sendRequest from "./common/sendRequest";

export const deleteUser = (id, cb) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/users/${id}`, "DELETE");
			dispatch(userActions.removeUser());
			cb();
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_ACCOUNT_DELETE));
		} catch (error) {
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
		} catch (err) {
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const changePassword = (id, formData) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/users/${id}/update_password`, "PUT", formData);
			dispatch(logoutUser());
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_PW_CHANGE));
		} catch (err) {
			dispatch(showMessage(MESSAGE_TYPE_ERROR, err.detail[0].msg));
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
		} catch (err) {
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	};
};

export const uploadImage = (file, type) => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/users/${type}`, 'POST', file, true);
			dispatch(userActions.setUser(data));
		} catch (err) {
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
		} catch (err) {
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}

export const getInstructors = () => {
	return async dispatch => {
		try {
			dispatch(uiActions.setIsLoading(true));
			const data = await sendRequest('/users/instructors', 'GET');
			await new Promise(res => setTimeout(() =>{res()}, 1000));
			dispatch(uiActions.setIsLoading(false));
			dispatch(userActions.setInstructors(data));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}

export const getUserById = id => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/users/${id}`, 'GET');
			dispatch(userActions.setPreviewedUser(data));
		} catch (err) {
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}
