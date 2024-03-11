import { useState, useEffect, useRef, useCallback } from 'react';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { AxiosCall } from '@/models';

export interface UseRequestState {
	error: string | null;
	loading: boolean;
	callEndpoint: (
		axiosCall: AxiosCall<unknown>,
	) => Promise<AxiosResponse<unknown>>;
}

const useRequest = () => {
	const [loading, setLoading] = useState(false);

	const controller = useRef<AbortController | undefined>(undefined);

	const callEndpoint = useCallback(
		async (axiosCall: AxiosCall<unknown>) => {
			if (axiosCall.controller)
				controller.current = axiosCall.controller;
			setLoading(true);
			let result: AxiosResponse<unknown> | undefined;
			let response = {} as {
				success: boolean;
				message: string;
				data: unknown;
			};
			try {
				result = await axiosCall.call;
				console.log(result)
				response = result.data as {
					success: boolean;
					message: string;
					data: unknown;
				};
			} catch (err: unknown) {
				if (isAxiosError(err)) {
					const error = err as AxiosError;
					console.log(error.response?.data);
					response = error.response?.data as {
						success: boolean;
						message: string;
						data: unknown;
					};
				}
			} finally {
				setLoading(false);
			}
			return response;
		},
		[],
	);

	useEffect(() => {
		const cancelEndpoint = () => {
			setLoading(false);
			controller.current?.abort();
		};
		return () => {
			cancelEndpoint();
		};
	}, []);

	return { loading, callEndpoint };
};

export default useRequest;
