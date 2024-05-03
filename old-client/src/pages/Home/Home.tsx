'use client';
import { PublicLayout } from '@/components/layouts';
import React from 'react';
import { Link } from 'react-router-dom';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
	return (
		<PublicLayout>
			<div className='w-full h-full flex flex-col items-center justify-center'>
				<h1 className='text-4xl font-bold text-slate-900'>
					Welcome to the Home Page
				</h1>
				<Link to='/dashboard'>Dashboard</Link>
			</div>
		</PublicLayout>
	);
};

export default Home;
