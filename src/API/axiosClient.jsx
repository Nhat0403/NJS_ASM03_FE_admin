// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import getCookie from '../getCookie';
import { useSelector } from 'react-redux';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const idUser = localStorage.getItem('id_user');
const token = idUser ? getCookie('user_token') : '';
const axiosClient = axios.create({
	baseURL: 'https://njs-asm-03-be-y7ad.vercel.app/',
	headers: {
		Authorization: 'Bearer ' + token,
		'Content-Type': 'application/json'
	},
	paramsSerializer: {
		indexes: null
	},
	withCredentials: true
});
axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...
	return config;
});
axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);
export default axiosClient;
