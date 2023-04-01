import axiosClient from './axiosClient';

const ChatRoomsAPI = {
	getMessageByRoomId: (roomId) => {
		const url = `/chatrooms/getById?roomId=${roomId}`;
		return axiosClient.get(url);
	},

	createNewRoom: () => {
		const url = `/chatrooms/createNewRoom`;
		return axiosClient.post(url);
	},

	addMessage: (query) => {
		const url = `/chatrooms/counselor/addMessage${query}`;
		return axiosClient.put(url);
	},

	searchMessage: (query) => {
		const url = `/chatrooms/counselor/searchMessage${query}`;
		return axiosClient.post(url);
	},

	getAllRoom: (query) => {
		const url = `/chatrooms/counselor/getAllRoom${query}`;
		return axiosClient.get(url);
	}
};

export default ChatRoomsAPI;
