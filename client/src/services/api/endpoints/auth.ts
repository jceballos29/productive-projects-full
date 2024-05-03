import api from '../api';
import { loadAbort } from '../../../utils';
import { AxiosCall, LoginRequest, LoginResponse, UserResponse } from '../../../model';

export const login = (
	data: LoginRequest,
): AxiosCall<LoginResponse> => {
	const controller = loadAbort();
	return {
		call: api.post('/auth/login', data, {
			signal: controller.signal,
		}),
		controller,
	};
};

export const logout = (): AxiosCall<LoginResponse> => {
	const controller = loadAbort();
	return {
		call: api.post('/auth/logout', {
			signal: controller.signal,
		}),
		controller,
	};
};

export const refresh = (): AxiosCall<LoginResponse> => {
	const controller = loadAbort();
	return {
		call: api.post('/auth/refresh', {
			signal: controller.signal,
		}),
		controller,
	};
};

export const me = (): AxiosCall<UserResponse> => {
	const controller = loadAbort();
	return {
		call: api.get('/auth/me', {
			signal: controller.signal,
		}),
		controller,
	};
};