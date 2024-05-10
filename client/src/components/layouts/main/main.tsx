'use client';
import React from 'react';
import styles from './Main.module.css';
import { Spin } from 'antd';
import { useRequest } from '../../../hooks';
import { UserResponse } from '../../../model';
import { useAppDispatch } from '../../../services/store';
import { me } from '../../../services/api/endpoints';
import { userAdapter } from '../../../utils';
import { setAuth } from '../../../services/store/slices/auth';

export interface MainProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const { callEndpoint } = useRequest<UserResponse>();

	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		const setSession = async () => {
			try {
				const response = await callEndpoint(me());
				if (response.status === 200) {
					const user = userAdapter(response.data);
					dispatch(setAuth(user));
				}
			} catch (error) {
				console.log(error);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			}
		};
		setSession();
	}, [callEndpoint, dispatch]);

	return (
		<div className={styles.main}>
			{loading ? <Spin size='large' /> : children}
		</div>
	);
};

export default MainLayout;
