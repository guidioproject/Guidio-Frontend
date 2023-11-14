import { instructorActions } from "../slices/instructorSlice";
import { handleErrorMessages, sendRequest } from "./common/request";

export const getInstructors = (page) => {
	return async dispatch => {
		try {
			page === 1 && dispatch(instructorActions.setInstructors({}));
			const data = await sendRequest(`/users/instructors?page=${page}&page_size=12`, 'GET', null, dispatch);

			if (page === 1)
				dispatch(instructorActions.setInstructors({ pages: data.pages, instructors: data.users }));
			if (page > 1)
				dispatch(instructorActions.updateInstructors(data.users));
		} catch (err) {
			if (err.message === 'requested_a_non-existent_page')
				dispatch(instructorActions.setInstructors({}));
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const searchInstructors = (search, page) => {
	return async dispatch => {
		try {
			page === 1 && dispatch(instructorActions.setInstructors({}));
			const data = await sendRequest(`/users/instructors/search?search=${search}&page=${page}&page_size=12`, 'GET', null, dispatch);

			if (page === 1)
				dispatch(instructorActions.setInstructors({ pages: data.pages, instructors: data.users }));
			if (page > 1)
				dispatch(instructorActions.updateInstructors(data.users));
		} catch (err) {
			if (err.message === 'requested_a_non-existent_page')
				dispatch(instructorActions.setInstructors({}));
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const getUserById = id => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/users/${id}`, 'GET', null, dispatch);
			dispatch(instructorActions.setActiveInstructor(data));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}