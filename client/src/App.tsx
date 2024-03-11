import Form from './components/Form';
import { Input } from './components/ui';
import { z } from 'zod';
import { useRequest } from './hooks';
import { LoginResponse, UserResponse, login } from './services/api/endpoints';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T | null;
}

export interface User {
	id: string;
	email: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
}

function App() {
	const { callEndpoint, loading } = useRequest();

	const userAdapter = (data: UserResponse): User => {
		return {
			id: data._id,
			email: data.email,
			role: data.role,
			createdAt: new Date(data.createdAt),
			updatedAt: new Date(data.updatedAt),
		};
	};

	const action = async (data: z.infer<typeof loginSchema>) => {
		console.log({ data });
		const result = await callEndpoint(login(data));
		const response = result.data as ApiResponse<LoginResponse>;
		console.log({ response });
		if (response.success) {
			localStorage.setItem('accessToken', response.data?.accessToken || '');
			localStorage.setItem('refreshToken', response.data?.refreshToken || '');
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
				action={
					action as unknown as (data: unknown) => Promise<boolean>
				}
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
}

export default App;
