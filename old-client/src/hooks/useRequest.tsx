import { AxiosCall } from '@/models';
import { ApiResponse } from '@/models/api';
import { AxiosError, isAxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const useRequest = <T,>() => {
	const [loading, setLoading] = useState(false);
	const controller = useRef<AbortController | undefined>(undefined);

	const callEndpoint = useCallback(
		async (axiosCall: AxiosCall<T>): Promise<ApiResponse<T>> => {
			if (axiosCall.controller)
				controller.current = axiosCall.controller;
			setLoading(true);
			let response = {} as ApiResponse<T>;
			try {
				const result = await axiosCall.call;
				response = result.data;
			} catch (err: unknown) {
				if (isAxiosError(err)) {
					const error = err as AxiosError<ApiResponse<T>>;
					const { data: result } = error.response!;
					response = {
						success: result.success || false,
						message: result.message || '',
						data: result.data,
					};
				} else {
					response = {
						success: false,
						message: (err as Error).message,
						data: null,
					};
				}
			} finally {
				setLoading(false);
			}
			return response;
		},
		[],
	);

	const cancelEndpoint = () => {
		setLoading(false);
		if (controller.current) controller.current?.abort();
	};

	useEffect(() => {
		return () => {
			cancelEndpoint();
		};
	}, []); // No necesitas dependencias aquí

	return { loading, callEndpoint, cancelEndpoint };
};

export default useRequest;
