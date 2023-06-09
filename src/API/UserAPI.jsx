import axiosClient from './axiosClient';

const UserAPI = {
	getAllClients: (query) => {
		const url = `admin/users/clients${query}`;
		return axiosClient.get(url);
	},

	getDetailData: (id) => {
		const url = `/users/${id}`;
		return axiosClient.get(url);
	},

	postSignUp: (query) => {
		const url = `/users/counselor/signup${query}`;
		return axiosClient.post(url);
	},

	postLogin: (query) => {
		const url = `users/counselor/login${query}`;
		return axiosClient.post(url);
	}
};

export default UserAPI;
