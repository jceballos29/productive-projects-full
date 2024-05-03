import React from 'react';
import Logo from './Logo';
import { RootState, useAppSelector } from '@/services/state/store';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui';
import {
	ChevronDownIcon,
	HomeIcon,
	Squares2X2Icon,
	BellIcon,
	UserIcon,
} from '@heroicons/react/24/outline';

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
	const location = useLocation();
	const { isAuthenticated, user } = useAppSelector(
		(state: RootState) => state.auth,
	);

	return (
		<nav className='w-full'>
			<div className='px-2 sm:px-6 lg:px-4'>
				<div className='relative flex h-14 items-center justify-between'>
					<Link to='/'>
						<Logo text />
					</Link>
					<div className='flex items-center space-x-3'>
						<Link to={location.pathname === '/' ? '/dashboard' : '/'}>
							<Button
								variant='text'
								size='sm'
								rounded='md'
								shadow={false}
								icon={
									location.pathname === '/' ? (
										<Squares2X2Icon className='h-4 w-4' />
									) : (
										<HomeIcon className='h-4 w-4' />
									)
								}
								className='bg-slate-300 hover:bg-slate-400'
							>
								{location.pathname === '/' ? 'Dashboard' : 'Home'}
							</Button>
						</Link>
						{isAuthenticated && (
							<>
							{/* Notifications */}
								<Button
									variant='text'
									size='sm'
									rounded='md'
									shadow={false}
									icon={<BellIcon />}
									className='bg-slate-300 hover:bg-slate-400'
								/>
								{/* User menu */}
								<div className='flex items-center space-x-2'>
									<figure className='h-8 aspect-square rounded-md overflow-hidden'>
										{user?.avatar ? (
											<img
												src={user?.avatar}
												alt={user.name}
												className='w-full h-full object-cover'
											/>
										) : (
											<div className='w-full h-full bg-indigo-500 flex items-center justify-center text-slate-50 font-bold'>
												<UserIcon
													className='w-4 h-4'
													aria-hidden='true'
												/>
											</div>
										)}
									</figure>
									<div>
										<h3 className='text-sm font-bold text-slate-800 leading-none'>
											{user?.name}
										</h3>
										<p className='text-xs text-slate-500 leading-none'>
											{user?.email}
										</p>
									</div>
									<ChevronDownIcon className='h-4 w-4' />
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
