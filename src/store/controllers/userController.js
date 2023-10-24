import messages from "../messages";
import { showAlert } from "../slices/uiSlice";
import { userActions } from "../slices/userSlice";
import { handleErrorMessages, sendRequest } from "./common/request";

export const deleteUser = (id, cb) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/users/${id}`, "DELETE");
			dispatch(userActions.removeUser());
			cb();
			dispatch(showAlert('success', messages.success['account_delete_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const updateUser = (id, formData) => {
	return async (dispatch) => {
		try {
			const newUser = await sendRequest(`/users/${id}`, "PUT", formData);
			dispatch(userActions.setUser(newUser));
			dispatch(showAlert('success', messages.success['account_update_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const changePassword = (id, formData) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/users/${id}/update_password`, "PUT", formData);
			dispatch(showAlert('success', messages.success['pw_change_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
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
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const uploadImage = (file, type) => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/users/${type}`, 'POST', file, true);
			dispatch(userActions.setUser(data));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
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
			handleErrorMessages(dispatch, err.message);
		}
	}
}
