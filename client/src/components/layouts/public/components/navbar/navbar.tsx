'use client';
import { Button, Flex, Space, Typography } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../../constants';
import Logo from '../../../../logo';
import styles from './navbar.module.css';
import { RootState, useAppSelector } from '../../../../../services/store';

export interface NavbarProps {
	// types...
}

const { Text } = Typography;

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
			<Link to={ROUTES.HOME}>
				<Space>
					<Flex align='center' justify='center' gap={6}>
						<Logo size={28} fontSize={14} />
						<Text strong style={{ fontSize: 18, fontWeight: 'bold' }}>
							Proyectos
						</Text>
					</Flex>
				</Space>
			</Link>
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
