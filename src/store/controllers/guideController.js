import messages from "../messages";
import { handleErrorMessages, sendRequest } from "./common/request";
import { guideActions } from "../slices/guideSlice";
import { showAlert, uiActions } from "../slices/uiSlice";

export const getGuides = function (page) {
	return async dispatch => {
		try {
			dispatch(uiActions.setError(null));
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
			if (err.message === 'guides_not_found')
				dispatch(guideActions.setGuides({}));
			handleErrorMessages(dispatch, err.message);
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const searchGuides = function (title, page) {
	return async dispatch => {
		try {
			dispatch(uiActions.setError(null));
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
			if (err.message === 'guides_not_found')
				dispatch(guideActions.setGuides({}));
			handleErrorMessages(dispatch, err.message);
			dispatch(uiActions.setIsLoading(false));
		}
	}
}

export const getGuidesByUserId = (id, page, cb) => {
	return async dispatch => {
		try {
			dispatch(uiActions.setError(null));
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
			handleErrorMessages(dispatch, err.message);
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
				dispatch(showAlert('success', messages.success['guide_create_success']));
			else
				dispatch(showAlert('success', messages.success['guide_draft_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const updateGuide = function (title, content, id, note, published, cb) {
	return async dispatch => {
		try {
			await sendRequest(`/guides/${id}`, 'PUT', { title, content, note, published });
			cb();

			if (published)
			dispatch(showAlert('success', messages.success['guide_update_success']));
			else
				dispatch(showAlert('success', messages.success['guide_draft_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const getGuideById = function (id) {
	return async dispatch => {
		try {
			dispatch(uiActions.setIsLoading(true));
			const { title, content, guideId, user, note, published, lastModified, coverImage } = await sendRequest(`/guides/guide/${id}`, 'GET');
			dispatch(guideActions.setActiveGuide({ title: `# ${title}`, content, guideId, user, note, published, lastModified, coverImage }));
			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
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
			dispatch(showAlert('success', messages.success['guide_delete_success']));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const uploadCoverImage = (file, id) => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/guides/cover_image?guide_id=${id}`, 'POST', file, true);
			dispatch(guideActions.updateCoverImage(data.coverImage));
		} catch (error) {
			console.log(error);
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}

export const deleteCoverImage = (id, cb) => {
	return async dispatch => {
		try {
			await sendRequest(`/guides/cover_image?guide_id=${id}`, 'DELETE');
			cb();
			dispatch(guideActions.removeCoverImage());
		} catch (error) {
			if (error.cause.status === 401)
				dispatch(getUserByToken());
			else
				dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_UNEXPECTED));
		}
	}
}