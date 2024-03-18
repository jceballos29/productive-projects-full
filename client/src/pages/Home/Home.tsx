'use client';
import { PublicLayout } from '@/components/layouts';
import React from 'react';
import { Link } from 'react-router-dom';

export interface HomeProps {
	// types...
}

const Home: React.FC<HomeProps> = () => {
	// return <div>
	// 	<Link to="/dashboard">Dashboard</Link>

	// </div>;
	return (
		<PublicLayout>
			<div className='w-full h-full flex items-center justify-center'>
				<h1 className='text-4xl font-bold text-slate-900'>
					Welcome to the Home Page
				</h1>
				<Link to="/dashboard">Dashboard</Link>
			</div>
		</PublicLayout>
	)
};

export default Home;
