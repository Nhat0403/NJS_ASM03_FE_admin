import axiosClient from './axiosClient';

const ProductAPI = {
	getAllProducts: (query) => {
		const url = `admin/products${query}`;
		return axiosClient.get(url);
	},

	getCategory: (query) => {
		const url = `admin/products/category${query}`;
		return axiosClient.get(url);
	},

	getDetail: (id) => {
		const url = `admin/products/${id}`;
		return axiosClient.get(url);
	},

	getPagination: (query) => {
		const url = `admin/products/pagination${query}`;
		return axiosClient.get(url);
	},

	searchProductByQuery: (query) => {
		const url = `admin/products/search${query}`
		return axiosClient.post(url);
	},

	postAddProduct: (query, data) => {
		const url = `admin/products/add-product${query}`;
		return axiosClient.post(url, data);
	}
};

export default ProductAPI;
