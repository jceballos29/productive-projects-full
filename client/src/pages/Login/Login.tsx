'use client';
import React from 'react';
import styles from './login.module.css';
import { Card, Typography, Form, Input, Button, message } from 'antd';
import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { useRequest } from '../../hooks';
import { LoginResponse } from '../../model';
import { login } from '../../services/api/endpoints';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	RootState,
	useAppDispatch,
	useAppSelector,
} from '../../services/store';
import { clearAuth, setAuth } from '../../services/store/slices/auth';
import { userAdapter } from '../../utils';
import { ROUTES } from '../../constants';

export interface LoginProps {}

const { Title } = Typography;

const Login: React.FC<LoginProps> = () => {
	const [form] = Form.useForm();
	const { loading, callEndpoint } = useRequest<LoginResponse>();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.auth,
	);

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			const response = await callEndpoint(login(values));
			if (response.status === 200) {
				const user = userAdapter(response.data.user);
				localStorage.setItem('accessToken', response.data.accessToken);
				localStorage.setItem('refreshToken', response.data.refreshToken);
				dispatch(setAuth(user));
				message.success('Sesión iniciada', 2);
			}
		} catch (errorInfo) {
			message.error('Error al iniciar sesión', 2);
		}
	};

	React.useEffect(() => {
		if (isAuthenticated) {
			const from = location.state?.from || null;
			navigate(from || ROUTES.DASHBOARD, { replace: true });
		} else {
			dispatch(clearAuth());
		}

		return () => {
			form.resetFields();
		};
	}, [dispatch, form, isAuthenticated, location.state, navigate]);

	return (
		<Card className={styles.login}>
			<Title style={{ marginBottom: 24 }} level={2}>
				Inicio de sesión
			</Title>
			<Form form={form} layout='vertical'>
				<Form.Item
					label='Correo electrónico'
					name='email'
					required={false}
					rules={[
						{ required: true, message: 'Please input your email!' },
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
					]}
				>
					<Input
						placeholder='example@mail.com'
						prefix={<MailOutlined />}
					/>
				</Form.Item>
				<Form.Item
					label='Contraseña'
					name='password'
					required={false}
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password
						placeholder='*********'
						prefix={<KeyOutlined />}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						style={{ marginTop: 24 }}
						type='primary'
						block
						size='large'
						onClick={handleSubmit}
						loading={loading}
					>
						Iniciar sesión
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default Login;
