'use client';
import { Form } from '@/components';
import { Input } from '@/components/ui';
import { useRequest } from '@/hooks';
import {
	LoginResponse,
	User,
	UserResponse,
	loginSchema,
} from '@/models';
import { login } from '@/services/api/endpoints';
import React from 'react';
import { z } from 'zod';

export interface LoginProps {
	// types...
}

const Login: React.FC<LoginProps> = () => {
	const { callEndpoint, loading } = useRequest<
		LoginResponse,
		LoginResponse
	>();

	const userAdapter = (data: UserResponse): User => {
		return {
			id: data._id,
			name: data.name,
			email: data.email,
			role: data.role,
			createdAt: new Date(data.createdAt),
			updatedAt: new Date(data.updatedAt),
		};
	};

	const action = async (data: z.infer<typeof loginSchema>) => {
		console.log({ data });
		const response = await callEndpoint(login(data));
		console.log({ response });
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
			console.log({ user });
			return true;
		} else {
			return false;
		}
	};

	return (
		<main className='bg-sky-white container mx-auto px-4 w-full h-screen flex flex-col'>
			<h1 className='mb-6 font-bold text-3xl'>Login</h1>
			<Form
				schema={loginSchema}
				action={action as (data: unknown) => Promise<boolean>}
				loading={loading}
				submitText='Login'
			>
				<Input
					name='email'
					label='Email'
					placeholder='Enter your email'
					schema={loginSchema.shape.email}
					allowClear
				/>
				<Input
					name='password'
					label='Password'
					type='password'
					placeholder='Enter your password'
					schema={loginSchema.shape.password}
				/>
			</Form>
		</main>
	);
};

export default Login;
