const initialState = {
	idUser: '',
	role: ''
};

const ReducerSession = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_SESSION':
			console.log('idUser: ', action.data._id);
			console.log('userRole: ', action.data.role);

			const stateLogin = [...state.idUser, ...state.role];
			stateLogin.idUser = action.data._id;
			stateLogin.role = action.data.role;
			return stateLogin;

		case 'DELETE_SESSION':
			console.log('idUser: ', action.data);

			const stateLogout = [...state.idUser, ...state.role];
			stateLogout.idUser = action.data;
			stateLogout.role = action.data;
			return stateLogout;

		default:
			return state;
	}
};

export default ReducerSession;
