const initialState = {
	idUser: '',
	role: '',
	token: '',
};

const ReducerSession = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_SESSION':
			console.log('idUser: ', action.data._id);
			console.log('userRole: ', action.data.role);
			console.log('token: ', action.data.token);

			const stateLogin = [...state.idUser, ...state.role, ...state.token];
			stateLogin.idUser = action.data._id;
			stateLogin.role = action.data.role;
			stateLogin.token = action.data.token;
			return stateLogin;

		case 'DELETE_SESSION':
			console.log('idUser: ', action.data);

			const stateLogout = [...state.idUser, ...state.role, ...state.token];
			stateLogout.idUser = action.data;
			stateLogout.role = action.data;
			stateLogout.token = action.data;
			return stateLogout;

		default:
			return state;
	}
};

export default ReducerSession;
