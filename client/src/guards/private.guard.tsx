import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants';
import { RootState, useAppSelector } from '../services/store';

export interface PrivateGuardProps {
  children: React.ReactNode;
}

const PrivateGuard: React.FC<PrivateGuardProps> = ({ children }) => {
	const location = useLocation();
	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.auth,
	);

	if (!isAuthenticated) {
		return (
			<Navigate
				to={ROUTES.LOGIN}
				state={{
					from: location.pathname,
				}}
			/>
		);
	} else {
		return children;
	}
};

export default PrivateGuard;
