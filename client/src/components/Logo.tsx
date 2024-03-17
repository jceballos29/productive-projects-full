import { classNames } from '@/utils';
import { TrophyIcon } from '@heroicons/react/24/outline';
import React from 'react';

export interface LogoProps {
	text?: boolean;
	className?: string;
}

const Logo: React.FC<LogoProps> = ({ text = false, className }) => {
	return (
		<div
			className={classNames(
				className,
				`flex items-center ${text ? 'gap-1' : ''}`,
			)}
		>
			<figure className='w-8 aspect-square border flex items-center justify-center rounded-md bg-indigo-500 border-indigo-500'>
				<TrophyIcon className='h-5 w-5 text-indigo-50' />
			</figure>
			{text && (
				<p className='text-base font-bold tracking-tight text-slate-900'>
					<span className='text-indigo-500'>Productive</span> Projects
				</p>
			)}
		</div>
	);
};

export default Logo;
