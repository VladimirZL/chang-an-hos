import { fetch } from 'whatwg-fetch';

function myFetch(url, data, cb, method='GET') {
	fetch(url, {
		body: JSON.stringify(data),
		method: method
	}).then(response => cb(response));
}

export default myFetch;