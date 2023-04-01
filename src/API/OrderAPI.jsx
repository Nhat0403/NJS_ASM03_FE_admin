import axiosClient from './axiosClient';

const orderAPI = {
  getAllOrders: (query) => {
		const url = `admin/orders${query}`;
		return axiosClient.get(url);
	},

	getOrderById: (query) => {
		const url = `admin/order${query}`;
		return axiosClient.get(url);
	}
}

export default orderAPI;