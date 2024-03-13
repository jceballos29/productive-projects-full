import { useState, useEffect, useRef, useCallback } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { AxiosCall } from '@/models';
import { ApiResponse } from '@/models/api';

const useRequest = <T, U>(
	initialCall: AxiosCall<T> | null = null,
	adapter: ((data: T) => U) | undefined = undefined,
	// 	{
	// 	initialCall = null,
	// 	adapter = undefined,
	// }: {
	// 	initialCall?: AxiosCall<T> | null;
	// 	adapter?: (data: T) => U;
	// }
) => {
	const [loading, setLoading] = useState(false);

	const controller = useRef<AbortController | undefined>(undefined);

	const callEndpoint = useCallback(
		async (axiosCall: AxiosCall<T>): Promise<ApiResponse<U>> => {
			if (axiosCall.controller)
				controller.current = axiosCall.controller;
			setLoading(true);
			let response = {} as {
				success: boolean;
				message: string;
				data: unknown;
			};
			try {
				const { data: result } = await axiosCall.call;
				response = {
					success: result.success,
					message: result.message,
					data: adapter
						? result.data
							? adapter(result.data)
							: null
						: result.data,
				};
			} catch (err: unknown) {
				if (isAxiosError(err)) {
					const error = err as AxiosError<ApiResponse<T>>;
					const { data: result } = error.response!;
					response = {
						success: result.success || false,
						message: result.message || '',
						data: adapter
							? result.data
								? adapter(result.data)
								: null
							: result.data,
					};
				}
			} finally {
				setLoading(false);
			}
			return response as ApiResponse<U>;
		},
		[adapter],
	);

	const cancelEndpoint = () => {
		setLoading(false);
		if (controller.current) controller.current?.abort();
	};

	useEffect(() => {
		if (initialCall) {
			callEndpoint(initialCall);
		}
		return () => {
			cancelEndpoint();
		};
	}, [callEndpoint, initialCall]);

	return { loading, callEndpoint, cancelEndpoint };
};

export default useRequest;
