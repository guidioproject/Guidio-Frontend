import { MESSAGE_ERROR_GUIDE_CREATE, MESSAGE_ERROR_GUIDE_DELETE, MESSAGE_ERROR_GUIDE_UPDATE, MESSAGE_ERROR_NO_GUIDES, MESSAGE_ERROR_UNEXPECTED, MESSAGE_SUCCESS_GUIDE_CREATE, MESSAGE_SUCCESS_GUIDE_DELETE, MESSAGE_SUCCESS_GUIDE_DRAFT, MESSAGE_SUCCESS_GUIDE_UPDATE, MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from "../constants";
import { sendRequest } from "./common/sendRequest";
import { guideActions } from "../slices/guideSlice";
import { showMessage, uiActions } from "../slices/uiSlice";
import { getUserByToken } from "./authController";

export const getGuides = function (page) {
	return async dispatch => {
		try {
			dispatch(guideActions.setError(null));
			page === 1 && dispatch(guideActions.setGuides({}));
			dispatch(uiActions.setIsLoading(true));

			const data = await sendRequest(`/guides?page=${page}&page_size=12`, 'GET');
			await new Promise((res) => { setTimeout(() => { res() }, 500) });

			dispatch(uiActions.setIsLoading(false));
			if (page === 1)
				dispatch(guideActions.setGuides({ pages: data.pages, guides: data.guides }));
			if (page > 1)
				dispatch(guideActions.updateGuides(data.guides));

		} catch (err) {
			await new Promise((res) => { setTimeout(() => { res() }, 500) });

			if (err.cause.status === 401)
				dispatch(getUserByToken());
			else if (err.cause.status === 404) {
				dispatch(guideActions.setError(MESSAGE_ERROR_NO_GUIDES));
				dispatch(guideActions.setGuides({}));
			}
			else
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const searchGuides = function (title, page) {
	return async dispatch => {
		try {
			dispatch(guideActions.setError(null));
			page === 1 && dispatch(guideActions.setGuides({}));
			dispatch(uiActions.setIsLoading(true));

			const data = await sendRequest(`/guides/search?title=${title}&page=${page}&page_size=12`, 'GET');
			await new Promise((res) => { setTimeout(() => { res() }, 500) });

			dispatch(uiActions.setIsLoading(false));
			if (page === 1)
				dispatch(guideActions.setGuides({ pages: data.pages, guides: data.guides }));
			if (page > 1)
				dispatch(guideActions.updateGuides(data.guides));
		} catch (err) {
			await new Promise((res) => { setTimeout(() => { res() }, 500) });

			if (err.cause.status === 401)
				dispatch(getUserByToken());
			else if (err.cause.status === 404) {
				dispatch(guideActions.setError(MESSAGE_ERROR_NO_GUIDES));
				dispatch(guideActions.setGuides({}));
			}
			else
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const getGuidesByUserId = (id, page, cb) => {
	return async dispatch => {
		try {
			dispatch(guideActions.setError(null));
			page === 1 && dispatch(guideActions.setGuides({}));
			dispatch(uiActions.setIsLoading(true));
			const data = await sendRequest(`/guides/${id}?page=${page}&page_size=12`, 'GET');
			await new Promise((res) => { setTimeout(() => { res() }, 500) });
			dispatch(uiActions.setIsLoading(false));
			if (page === 1)
				dispatch(guideActions.setGuides({ pages: data.pages, guides: data.guides }));
			if (page > 1)
				dispatch(guideActions.updateGuides(data.guides));
			if (cb)
				cb();
		} catch (err) {
			await new Promise((res) => { setTimeout(() => { res() }, 500) });

			if (err.cause.status === 401)
				dispatch(getUserByToken());
			else if (err.cause.status === 404) {
				dispatch(guideActions.setError(MESSAGE_ERROR_NO_GUIDES));
				dispatch(guideActions.setGuides({}));
			}
			else
				dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const createGuide = function (title, content, note, published, cb) {
	return async dispatch => {
		try {
			await sendRequest('/guides', 'POST', { title, content, note, published });
			cb();
			if (published)
				dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_GUIDE_CREATE));
			else
				dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_GUIDE_DRAFT));
		} catch (err) {
			if (err.cause.status === 401)
				dispatch(getUserByToken());

			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_GUIDE_CREATE));
		}
	}
}

export const updateGuide = function (title, content, id, note, published, cb) {
	return async dispatch => {
		try {
			await sendRequest(`/guides/${id}`, 'PUT', { title, content, note, published });
			cb();
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_GUIDE_UPDATE));
		} catch (err) {
			if (err.cause.status === 401)
				dispatch(getUserByToken());

			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_GUIDE_UPDATE));
		}
	}
}

export const getGuideById = function (id) {
	return async dispatch => {
		try {
			dispatch(uiActions.setIsLoading(true));
			const { title, content, guideId, user, note, published, lastModified } = await sendRequest(`/guides/guide/${id}`, 'GET');
			dispatch(guideActions.setActiveGuide({ title: `# ${title}`, content, guideId, user, note, published, lastModified }));
			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			if (err.cause.status === 401)
				dispatch(getUserByToken());

			dispatch(guideActions.setActiveGuide({}));
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const deleteGuide = (id, cb) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/guides/${id}`, "DELETE");
			cb();
			dispatch(showMessage(MESSAGE_TYPE_SUCCESS, MESSAGE_SUCCESS_GUIDE_DELETE))
		} catch (err) {
			if (err.cause.status === 401)
				dispatch(getUserByToken());
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_GUIDE_DELETE));
		}
	};
};