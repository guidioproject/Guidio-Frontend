import messages from "../messages";
import { handleErrorMessages, sendRequest } from "./common/request";
import { guideActions } from "../slices/guideSlice";
import { uiActions } from "../slices/uiSlice";

export const getGuides = function (page) {
	return async dispatch => {
		try {
			page === 1 && dispatch(guideActions.setGuides({}));
			const data = await sendRequest(`/guides?page=${page}&page_size=12`, 'GET', null, dispatch);

			if (page === 1)
				dispatch(guideActions.setGuides({ pages: data.pages, guides: data.guides }));

			if (page > 1)
				dispatch(guideActions.updateGuides(data.guides));
		} catch (err) {
			if (err.message === 'guides_not_found')
				dispatch(guideActions.setGuides({}));
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const searchGuides = function (title, page) {
	return async dispatch => {
		try {
			page === 1 && dispatch(guideActions.setGuides({}));
			const data = await sendRequest(`/guides/search?title=${title}&page=${page}&page_size=12`, 'GET', null, dispatch);

			if (page === 1)
				dispatch(guideActions.setGuides({ pages: data.pages, guides: data.guides }));
			if (page > 1)
				dispatch(guideActions.updateGuides(data.guides));
		} catch (err) {
			if (err.message === 'guides_not_found')
				dispatch(guideActions.setGuides({}));
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const getGuidesByUserId = (id, page, size, cb) => {
	return async dispatch => {
		try {
			page === 1 && dispatch(guideActions.setGuides({}));
			const data = await sendRequest(`/guides/${id}?page=${page}&page_size=${size}`, 'GET', null, dispatch);

			if (page === 1)
				dispatch(guideActions.setGuides({ pages: data.pages, guides: data.guides }));
			if (page > 1)
				dispatch(guideActions.updateGuides(data.guides));
			if (cb)
				cb();
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const createGuide = function (title, content, note, published, cb) {
	return async dispatch => {
		try {
			await sendRequest('/guides', 'POST', { title, content, note, published }, dispatch);
			cb();
			if (published)
				dispatch(uiActions.showAlert({ type: 'success', msgConf: messages.success['guide_create_success'] }));
			else
				dispatch(uiActions.showAlert({ type: 'success', msgConf: messages.success['guide_draft_success'] }));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const updateGuide = function (title, content, id, note, published, cb) {
	return async dispatch => {
		try {
			await sendRequest(`/guides/${id}`, 'PUT', { title, content, note, published }, dispatch);
			cb();

			if (published)
				dispatch(uiActions.showAlert({ type: 'success', msgConf: messages.success['guide_update_success'] }));
			else
				dispatch(uiActions.showAlert({ type: 'success', msgConf: messages.success['guide_draft_success'] }));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const getGuideById = function (id) {
	return async dispatch => {
		try {
			const { title, content, guideId, user, note, published, lastModified, coverImage } = await sendRequest(`/guides/guide/${id}`, 'GET', null, dispatch);
			dispatch(guideActions.setActiveGuide({ title: `# ${title}`, content, guideId, user, note, published, lastModified, coverImage }));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
			dispatch(guideActions.setActiveGuide({}));
		}
	}
}

export const deleteGuide = (id, cb) => {
	return async (dispatch) => {
		try {
			await sendRequest(`/guides/${id}`, "DELETE", null, dispatch);
			cb();
			dispatch(uiActions.showAlert({ type: 'success', msgConf: messages.success['guide_delete_success'] }));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	};
};

export const uploadCoverImage = (file, id) => {
	return async dispatch => {
		try {
			const data = await sendRequest(`/guides/cover_image?guide_id=${id}`, 'POST', file, dispatch);
			dispatch(guideActions.updateCoverImage(data.coverImage));
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}

export const deleteCoverImage = (id, cb) => {
	return async dispatch => {
		try {
			await sendRequest(`/guides/cover_image?guide_id=${id}`, 'DELETE', null, dispatch);
			cb();
			dispatch(guideActions.removeCoverImage());
		} catch (err) {
			handleErrorMessages(dispatch, err.message);
		}
	}
}