import api from "./index.js"

const get = (url, data, header) => {
	return api.request({
		url,
		data,
		method: 'GET',
		header
	}).then((res) => {
		return res.data
	})
}

const post = (url, data, header) => {
	return api.request({
		url,
		method: 'POST',
		data,
		header
	}).then((res) => {
		return res.data
	})
}

const put = (url, data, header) => {
	return api.request({
		url,
		method: 'PUT',
		data,
		header
	}).then((res) => {
		return res.data
	})
}

const remove = (url, data, header) => {
	return api.request({
		url,
		method: 'DELETE',
		data,
		header
	}).then((res) => {
		return res.data
	})
}


module.exports = {
	get,
	post,
	put,
	remove
}