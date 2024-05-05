import { AxiosResponse, isAxiosError } from 'axios';
import React from 'react';
import { AxiosCall } from '../model';

const useRequest = <T,>() => {
	const [loading, setLoading] = React.useState(false);
	const controller = React.useRef<AbortController | undefined>(
		undefined,
	);

	const callEndpoint = React.useCallback(
		async (axiosCall: AxiosCall<T>): Promise<AxiosResponse<T>> => {
			if (axiosCall.controller)
				controller.current = axiosCall.controller;
			setLoading(true);
			let response = {} as AxiosResponse<T>;
			try {
				response = await axiosCall.call;
			} catch (err: unknown) {
				const error = new Error('Error en la petición');
				if (isAxiosError(err)) {
					error.message = err.response?.data.message;
					error.name = err.response?.data.name;
				} else {
					error.message = (err as Error).message;
					error.name = (err as Error).name;
				}
				error.stack = (err as Error).stack;
				throw error;
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

	React.useEffect(() => {
		return () => {
			cancelEndpoint();
		};
	}, []); // No necesitas dependencias aquí

	return { loading, callEndpoint, cancelEndpoint };
};

export default useRequest;
