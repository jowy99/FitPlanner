export const apiFetch = async (endpoint, options = {}) => {
	const token = localStorage.getItem('token');

	const response = await fetch(`/api/${endpoint}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			...(options.headers || {}),
		},
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}

	return response.json();
};