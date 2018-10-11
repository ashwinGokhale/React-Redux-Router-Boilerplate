import { getStorage, axios } from '../constants';

// Helper functions
export const getToken = () => getStorage().getItem('token');
const makeDispatcher = (type, ...argNames) => (...args) => {
	const action = { type };
	argNames.forEach((arg, index) => {
		action[argNames[index]] = args[index];
	});
	return action;
};

// Actions
export const AUTH_USER_SET = 'AUTH_USER_SET';
export const AUTH_TOKEN_SET = 'AUTH_TOKEN_SET';
export const AUTH_REMEMBER_ME_SET = 'AUTH_REMEMBER_ME_SET';

export const FLASH_GREEN_SET = 'FLASH_GREEN_SET';
export const FLASH_RED_SET = 'FLASH_RED_SET';

// Dispatchers
const setUser = makeDispatcher(AUTH_USER_SET, 'user');
const setToken = makeDispatcher(AUTH_TOKEN_SET, 'token');
const setRememberMe = makeDispatcher(AUTH_REMEMBER_ME_SET, 'rememberMe');

const setGreenFlash = makeDispatcher(FLASH_GREEN_SET, 'msgGreen');
const setRedFlash = makeDispatcher(FLASH_RED_SET, 'msgRed');

// Creators
export const signUp = newUser => async dispatch => {
	try {
		const {
			data: { response }
		} = await axios.post('/api/auth/signup', newUser);
		dispatch(setToken(response.token));
		dispatch(setUser(response.user));
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const signIn = (email, password, rememberMe) => async dispatch => {
	try {
		const {
			data: { response }
		} = await axios.post('/api/auth/login', {
			email,
			password
		});
		dispatch(setToken(response.token));
		dispatch(setUser(response.user));
		dispatch(setRememberMe(rememberMe));
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const signOut = () => async dispatch => {
	try {
		dispatch(setToken(null));
		dispatch(setUser(null));
		dispatch(setRememberMe(false));
	} catch (error) {
		throw error;
	}
};

export const forgotPassword = async email => {
	try {
		const {
			data: { response }
		} = await axios.post('/api/auth/forgot', { email });
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const resetPassword = async (password, passwordConfirm, token) => {
	try {
		const {
			data: { response }
		} = await axios.post('/api/auth/reset', {
			password,
			passwordConfirm,
			token
		});
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const sendFlashMessage = (msg, type = 'red') => dispatch => {
	type === 'red' ? dispatch(setRedFlash(msg)) : dispatch(setGreenFlash(msg));
};

export const clearFlashMessages = () => dispatch => {
	dispatch(setGreenFlash(''));
	dispatch(setRedFlash(''));
};

export const fetchUsers = async params => {
	try {
		const token = getToken();
		const {
			data: { response }
		} = await axios.get('/api/users', {
			params,
			headers: { Authorization: `Bearer ${token}` }
		});
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const fetchUser = async (id, params) => {
	try {
		const token = getToken();
		const {
			data: { response }
		} = await axios.get(`/api/users/${id}`, {
			params,
			headers: { Authorization: `Bearer ${token}` }
		});
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const fetchProfile = params => async dispatch => {
	try {
		const token = getToken();
		if (!token) {
			dispatch(setUser(null));
			dispatch(setToken(null));
			return null;
		}
		const {
			data: { response }
		} = await axios.get('/api/auth/me', {
			params,
			headers: { Authorization: `Bearer ${token}` }
		});
		dispatch(setUser(response.user));
		dispatch(setToken(response.token));
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const updateProfile = (id, member) => async (dispatch, getState) => {
	try {
		const {
			sessionState: { user }
		} = getState();
		if (
			!user ||
			(Object.keys(user).length === 0 && user.constructor === Object)
		) {
			dispatch(setUser(null));
			dispatch(setToken(null));
			return null;
		}
		const token = getToken();
		const {
			data: { response }
		} = await axios.put(`/api/users/${id}`, member, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (user._id === id) dispatch(setUser(response));
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const getUser = async params => {
	const token = getToken();

	try {
		const {
			data: { response }
		} = await axios.get('/api/auth/me', {
			params,
			headers: { Authorization: `Bearer ${token}` }
		});

		return response;
	} catch (error) {
		throw error.response;
	}
};

export const storageChanged = e => dispatch => {
	console.log('Local storage changed event:', e);
	const token = getToken();
	if (!token) signOut()(dispatch);
	else dispatch(setToken(token));
};
