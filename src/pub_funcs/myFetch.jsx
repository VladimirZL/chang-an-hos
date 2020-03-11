import fetch from 'fetch';

function myFetch(url, data, method='GET') {
	return fetch(url, {
		body: JSON.stringify(data),
		method: method
	}).then(response => response.json());
}

export default myFetch;