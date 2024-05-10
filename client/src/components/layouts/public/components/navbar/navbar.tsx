'use client';
import { Button, Flex, Space } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../../constants';
import {
	RootState,
	useAppSelector,
} from '../../../../../services/store';
import { Logotype } from '../../../../Logotype';
import styles from './Navbar.module.css';

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
	const location = useLocation();
	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.auth,
	);

	return (
		<Flex
			className={styles.navbar}
			justify='space-between'
			align='center'
		>
			<Logotype />
			<Space>
				{location.pathname === ROUTES.HOME &&
					(isAuthenticated ? (
						<Link to={ROUTES.DASHBOARD}>
							<Button type='primary'>Dashboard</Button>
						</Link>
					) : (
						<Link to={ROUTES.LOGIN}>
							<Button type='primary'>Login</Button>
						</Link>
					))}
			</Space>
		</Flex>
	);
};

export default Navbar;
