import { AxiosResponse } from 'axios';
import { ApiResponse } from './api';

export interface AxiosCall<T> {
	call: Promise<
		AxiosResponse<ApiResponse<T>>
	>;
	controller?: AbortController;
}
