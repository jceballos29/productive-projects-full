import { RootState, useAppSelector } from '@/services/state/store';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
	const location = useLocation();
	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.auth,
	);

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/login'
				state={{
					from: location.pathname,
				}}
			/>
		);
	} else {
		return <Outlet />;
	}
};

export default PrivateRoutes;
