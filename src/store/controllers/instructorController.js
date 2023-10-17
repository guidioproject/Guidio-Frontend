import { MESSAGE_ERROR_NO_INSTRUCTORS, MESSAGE_ERROR_UNEXPECTED, MESSAGE_TYPE_ERROR } from "../constants";
import { instructorActions } from "../slices/instructorSlice";
import { showAlert, uiActions } from "../slices/uiSlice";
import { getUserByToken } from "./authController";
import { sendRequest } from "./common/sendRequest";

export const getInstructors = (page) => {
	return async dispatch => {
		try {
			dispatch(uiActions.setError(null));
			page === 1 && dispatch(instructorActions.setInstructors({}));
			dispatch(uiActions.setIsLoading(true));

			const data = await sendRequest(`/users/instructors?page=${page}&page_size=12`, 'GET');
			await new Promise(res => setTimeout(() => { res() }, 500));
			dispatch(uiActions.setIsLoading(false));

			if (page === 1)
				dispatch(instructorActions.setInstructors({pages: data.pages, instructors: data.users}));
			if (page > 1)
				dispatch(instructorActions.updateInstructors(data.users));

		} catch (error) {
			await new Promise(res => setTimeout(() => { res() }, 500));

			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else if (error.cause.status === 404) {
				dispatch(uiActions.setError(MESSAGE_ERROR_NO_INSTRUCTORS));
				dispatch(instructorActions.setInstructors({}));
			}
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const searchInstructors = (search, page) => {
	return async dispatch => {
		try {
			dispatch(uiActions.setError(null));
			page === 1 && dispatch(instructorActions.setInstructors({}));
			dispatch(uiActions.setIsLoading(true));

			const data = await sendRequest(`/users/instructors/search?search=${search}&page=${page}&page_size=12`, 'GET');
			await new Promise(res => {setTimeout(() => {res()}, 500)});

			dispatch(uiActions.setIsLoading(false));
			if (page === 1)
				dispatch(instructorActions.setInstructors({pages: data.pages, instructors: data.users}));
			if (page > 1)
				dispatch(instructorActions.updateInstructors(data.users));
		} catch(err) {
			await new Promise((res) => { setTimeout(() => { res() }, 500) });

			if (err.cause.status === 401)
				dispatch(getUserByToken());
			else if (err.cause.status === 404) {
				dispatch(uiActions.setError(MESSAGE_ERROR_NO_INSTRUCTORS));
				dispatch(instructorActions.setInstructors({}));
			}
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const getUserById = id => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/users/${id}`, 'GET');
			dispatch(instructorActions.setActiveInstructor(data));
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}