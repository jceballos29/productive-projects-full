import React from 'react';

export interface LoaderProps {
	show?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ show = false }) => {
	return show ? (
		<div className='absolute z-30 top-0 left-0 w-full h-screen bg-slate-950/50 backdrop-blur-sm flex items-center justify-center'>
			{/* <div className='w-20 h-20 border-4 border-sky-500 border-solid border-t-transparent rounded-full animate-spin'></div> */}
			<div className='loader'></div>
		</div>
	) : null;
};

export default Loader;
