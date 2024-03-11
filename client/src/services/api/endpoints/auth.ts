import { loadAbort } from '../../../utils';
import api from '..';

export interface LoginRequest {
	email: string;
	password: string;
}

export interface UserResponse {
	_id: string;
	email: string;
	password: string | null;
	role: string;
	createdAt: string;
	updatedAt: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	user: UserResponse;
}

export const login = (data: LoginRequest) => {
	const controller = loadAbort();
	return {
		call: api.post<LoginResponse>('/auth/login', data, {
			signal: controller.signal,
		}),
		controller,
	};
};
