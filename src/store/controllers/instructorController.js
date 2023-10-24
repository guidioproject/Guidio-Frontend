import { instructorActions } from "../slices/instructorSlice";
import { uiActions } from "../slices/uiSlice";
import { handleErrorMessages, sendRequest } from "./common/request";

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
				dispatch(instructorActions.setInstructors({ pages: data.pages, instructors: data.users }));
			if (page > 1)
				dispatch(instructorActions.updateInstructors(data.users));

		} catch (err) {
			await new Promise(res => setTimeout(() => { res() }, 500));
			if (err.message === 'requested_a_non-existent_page')
				dispatch(instructorActions.setInstructors({}));
			handleErrorMessages(dispatch, err.message);
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
			await new Promise(res => { setTimeout(() => { res() }, 500) });

			dispatch(uiActions.setIsLoading(false));
			if (page === 1)
				dispatch(instructorActions.setInstructors({ pages: data.pages, instructors: data.users }));
			if (page > 1)
				dispatch(instructorActions.updateInstructors(data.users));
		} catch (err) {
			await new Promise(res => setTimeout(() => { res() }, 500));
			if (err.message === 'requested_a_non-existent_page')
				dispatch(instructorActions.setInstructors({}));
			handleErrorMessages(dispatch, err.message);
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const getUserById = id => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/users/${id}`, 'GET');
			dispatch(instructorActions.setActiveInstructor(data));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}