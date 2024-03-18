import React from 'react';
import Navbar from '../Navbar';

export interface PublicLayoutProps {
	children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
	return (
		<div className='w-ful h-full flex flex-col'>
			<Navbar />
			<div className='w-full flex-grow p-2 sm:p-6 lg:p-4'>
				{children}
			</div>
			<footer className='w-full'>
				<div className='px-2 sm:px-6 lg:px-4'>
					<div className='relative flex h-14 items-center justify-between'>
						<p className='text-xs text-slate-400 mt-8 text-left'>
							&copy; Juan Ceballos 2024
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default PublicLayout;
