import { AxiosCall, LoginRequest, LoginResponse } from '@/models';
import api from '..';
import { loadAbort } from '../../../utils';

export const login = (data: LoginRequest): AxiosCall<LoginResponse> => {
	const controller = loadAbort();
	return {
		call: api.post('/auth/login', data, {
			signal: controller.signal,
		}),
		controller,
	};
};
