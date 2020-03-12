import { fetch } from 'whatwg-fetch';

export function myFetchPost(url, data, cb, method='POST') {
		// console.log(JSON.stringify(data), method);
		fetch(url, {
			body: JSON.stringify(data),
			method: method
		}).then(response => {
			const { status } = response;
			if (status === 200) 
				return response.json();
		}).then(data => cb(data));
	}

export function myFetchGet(url, data, cb, method='GET') {
		let _paramsArr = [];
		Object.keys(data).forEach(key => {
			_paramsArr.push(`${key}=${data[key]}`)
		});
		let _url = `${url}?${_paramsArr.join('&')}`;
		console.log(_url);
		// console.log(JSON.stringify(data), method);
		fetch(_url, {
			method: method
		}).then(response => {
			const { status } = response;
			if (status === 200) 
				return response.json();
		}).then(data => cb(data));
	}

