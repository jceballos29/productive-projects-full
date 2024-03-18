'use client';
import { Form } from '@/components';
import { PublicLayout } from '@/components/layouts';
import { Input } from '@/components/ui';
import { useRequest } from '@/hooks';
import { LoginResponse, UserResponse, loginSchema } from '@/models';
import { login } from '@/services/api/endpoints';
import { setAuth } from '@/services/state/slices/auth';
import {
	RootState,
	useAppDispatch,
	useAppSelector,
} from '@/services/state/store';
import { userAdapter } from '@/utils';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.auth,
	);

	const { callEndpoint, loading } = useRequest<LoginResponse>();

	const action = async (data: z.infer<typeof loginSchema>) => {
		const response = await callEndpoint(login(data));
		if (response.success) {
			localStorage.setItem(
				'accessToken',
				response.data?.accessToken || '',
			);
			localStorage.setItem(
				'refreshToken',
				response.data?.refreshToken || '',
			);
			const user = userAdapter(response.data?.user as UserResponse);
			dispatch(setAuth(user));
			toast.success(response.message || 'Success!');
			return true;
		} else {
			toast.error(response.message || 'Error!');
			return false;
		}
	};

	React.useEffect(() => {
		if (isAuthenticated) {
			const from = location.state?.from || null;
			navigate(from || '/dashboard', { replace: true });
		}
	}, [isAuthenticated, location.state, navigate]);

	return (
		<PublicLayout>
			<div className='w-full h-full flex flex-col items-center justify-center'>
				<div className='w-full max-w-96 mx-auto px-8 py-10 rounded-md  bg-gray-50'>
					<div className='space-y-2 mb-8'>
						<h1 className='text-3xl font-bold leading-9 tracking-tight text-slate-900'>
							Sign in to account
						</h1>
						<p className='text-slate-500'>
							Enter your email & password to login
						</p>
					</div>
					<Form
						schema={loginSchema}
						action={action as (data: unknown) => Promise<boolean>}
						loading={loading}
						submitText='Login'
					>
						<Input
							name='email'
							label='Email address'
							placeholder='example@mail.com'
							schema={loginSchema.shape.email}
							allowClear
						/>
						<Input
							name='password'
							label='Password'
							type='password'
							placeholder='**********'
							schema={loginSchema.shape.password}
						/>
						<div className='w-full flex justify-end mb-3'>
							<p className='text-sm font-medium text-indigo-500'>
								Forgot Password
							</p>
						</div>
					</Form>
					<div className='mt-6'>
						<p className='mx-auto text-center text-sm text-slate-500'>
							Don't have an account?{' '}
							<span
								onClick={() => navigate('/register')}
								className='text-indigo-500 cursor-pointer'
							>
								Sign up
							</span>
						</p>
					</div>
				</div>
			</div>
		</PublicLayout>
	);
};

export default Login;
