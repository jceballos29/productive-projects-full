'use client';
import {
	BellOutlined,
	HomeOutlined,
	LogoutOutlined,
	SettingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Badge,
	Button,
	Dropdown,
	Flex,
	Input,
	Space,
	Typography,
} from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../constants';
import styles from './topbar.module.css';
import {
	RootState,
	useAppDispatch,
	useAppSelector,
} from '../../../../../services/store';
import { clearAuth } from '../../../../../services/store/slices/auth';

export interface TopbarProps {}

const { Text } = Typography;
const { Search } = Input;

const Topbar: React.FC<TopbarProps> = () => {
	const { user } = useAppSelector((state: RootState) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		dispatch(clearAuth());
		navigate(ROUTES.LOGIN);
	};

	return user ? (
		<Flex
			align='center'
			justify='space-between'
			className={styles.topbar}
		>
			<Search placeholder='Buscar...' style={{ width: 400 }} />
			{/* <Space>Search...</Space> */}
			<Space size='middle'>
				<Link to={ROUTES.HOME}>
					<Button shape='circle'>
						<HomeOutlined />
					</Button>
				</Link>
				<Badge count={99} overflowCount={10} style={{ fontSize: 10}} >
					<Button shape='circle'>
						<BellOutlined />
					</Button>
				</Badge>
				<Dropdown
					menu={{
						items: [
							{
								key: 'profile',
								label: 'Perfil',
								icon: <UserOutlined />,
								onClick: () => console.log('Profile'),
							},
							{
								key: 'settings',
								label: 'Configuración',
								icon: <SettingOutlined />,
								onClick: () => console.log('Settings'),
							},
							{
								type: 'divider',
							},
							{
								key: 'logout',
								label: 'Cerrar sesión',
								icon: <LogoutOutlined />,
								onClick: () => handleLogout(),
							},
						],
					}}
				>
					<Flex align='center' gap={6} style={{ cursor: 'pointer' }}>
						<Avatar
							alt={user.name}
							shape='circle'
							src='https://randomuser.me/api/portraits/med/men/75.jpg'
							icon={<UserOutlined />}
						/>
						<Text strong>{user.name.split(' ')[0]}</Text>
					</Flex>
				</Dropdown>
			</Space>
		</Flex>
	) : null;
};

export default Topbar;
