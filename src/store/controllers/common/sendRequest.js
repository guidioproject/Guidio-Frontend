export const sendRequest =  async(url, request, body, isFile) => {
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
		if (res.status === 500)
			throw new Error('Error',  {cause: {message: res.statusText, status: res.status}});

		if (request === 'DELETE') {
			if (res.status === 204)
				return true;
			else
				throw new Error('Error', {cause: {message: res.statusText, status: res.status}});
		}

		const data = await res.json();

		if (!res.ok)
			throw Error('Error', {cause: {message: {...data}, status: res.status}});

		return data;
}