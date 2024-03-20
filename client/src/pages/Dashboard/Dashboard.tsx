'use client';
import { Logo } from '@/components';
import React from 'react';

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<aside className='w-72 h-full bg-slate-300 flex flex-col p-4'>
				<Logo text />
			</aside>
			<div className='flex-1 h-full overflow-hidden'></div>
		</div>
	);
};

export default Dashboard;
