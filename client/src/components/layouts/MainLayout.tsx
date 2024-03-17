'use client';
import { useRequest } from '@/hooks';
import { UserResponse } from '@/models';
import { me } from '@/services/api/endpoints';
import { setAuth } from '@/services/state/slices/auth';
import { useAppDispatch } from '@/services/state/store';
import { userAdapter } from '@/utils';
import { TrophyIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

export interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
	const dispatch = useAppDispatch();
	const { callEndpoint } = useRequest<UserResponse>();
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const fetchUser = async () => {
			const response = await callEndpoint(me());
			if (response.success && response.data) {
				const user = userAdapter(response.data);
				dispatch(setAuth(user));
			}
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		};
		fetchUser();
	}, [callEndpoint, dispatch]);

	return (
		<main className='w-full h-screen max-h-screen relative bg-indigo-100'>
			<Toaster position='top-center' reverseOrder={false} />
			{loading ? (
				<div className='w-full h-full flex items-center justify-center'>
					<figure className='w-40 aspect-square bg-indigo-500 border flex items-center justify-center border-indigo-500 rounded-3xl shadow-2xl overflow-hidden'>
						<TrophyIcon className='w-20 h-20 text-white' />
					</figure>
				</div>
			) : (
				<div className='w-ful h-full flex flex-col'>
					<Navbar />
					<div className='w-full flex-grow p-2 sm:p-6 lg:p-4'>
						<Outlet />
					</div>
				</div>
			)}
		</main>
	);
};

export default MainLayout;
