export default async function sendRequest(url, request, body, isFile) {
	if (!isFile) {
		body = JSON.stringify(body);
	}
	const res = await fetch(url, {
		method: request,
		headers: !isFile ? {
			'Accept': "application/json",
			'Content-Type': 'application/json'
		} : undefined,
		body: body || undefined
	});
	if (request === 'DELETE') {
		if (!res.ok)
			throw res.statusText;

		if (res.status === 204)
			return true;
	}

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}

	return data;
}