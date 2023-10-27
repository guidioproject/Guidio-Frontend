import messages from "../../messages";
import { showAlert, uiActions } from "../../slices/uiSlice";
import { getUserByToken } from "../authController";

export const sendRequest =  async(url, request, body, isFile) => {
		if (!isFile)
			body = JSON.stringify(body);

		const res = await fetch(url, {
			method: request,
			headers: !isFile ? {
				'Accept': "application/json",
				'Content-Type': 'application/json'
			} : undefined,
			body: body || undefined
		});
		if (res.status === 500)
			throw new Error('server_error');

		if (request === 'DELETE') {
			if (res.status === 204)
				return true;
			else
				throw new Error('server_error');
		}

		const data = await res.json();

		if (!res.ok) {
			const {detail} = data;

			if (Array.isArray(detail))
				throw new Error(detail[0].type);

			else if (typeof detail === 'string') {
				const typeFromMsg = detail.toLowerCase().split(" ").join("_");

				throw new Error(typeFromMsg);
			}
		}

		return data;
}

export const handleErrorMessages = (dispatch, msg) => {
	if (msg === 'unauthorized')
		dispatch(getUserByToken());
	else if (msg === 'guides_not_found' || msg === 'requested_a_non-existent_page')
		dispatch(uiActions.setError(messages.error[msg]));
	else
		dispatch(showAlert('error', messages.error[msg]))
}