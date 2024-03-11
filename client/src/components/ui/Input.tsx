import {
	EyeIcon,
	EyeSlashIcon,
} from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

interface InputProps {
	name: string;
	label?: string;
	schema: z.Schema<unknown>;
	type?: 'text' | 'email' | 'password' | string;
	placeholder?: string;
	allowClear?: boolean;
}

const Input: React.FC<InputProps> = ({
	name,
	label,
	schema,
	type = 'text',
	placeholder,
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const [showPassword, setShowPassword] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		setIsError(!!errors[name]);
	}, [errors, name]);

	return (
		<div className={`pb-5 mb-2 w-full relative`}>
			<label
				htmlFor={name}
				className='pl-2 mb-1 block text-sm font-medium text-gray-700'
			>
				{label}
			</label>
			<div className='relative'>
				<input
					{...register(name)}
					{...{ schema }}
					type={showPassword ? 'text' : type}
					id={name}
					className={`w-full text-slate-700 shadow-sm border ${
						isError
							? 'border-rose-500 focus:border-rose-500'
							: 'border-slate-200 focus:border-indigo-500'
					} focus:ring-indigo-500  focus:outline-none sm:text-sm rounded-md py-2 px-3 placeholder:text-slate-400`}
					placeholder={placeholder}
				/>
				{type === 'password' && (
					<button
						type='button'
						className='absolute top-1/2 right-3 transform -translate-y-1/2'
						onClick={handleTogglePassword}
					>
						{showPassword ? (
							<EyeSlashIcon
								className={`h-5 w-5 ${
									isError ? 'text-rose-400' : 'text-slate-400'
								}`}
							/>
						) : (
							<EyeIcon
								className={`h-5 w-5 ${
									isError ? 'text-rose-400' : 'text-slate-400'
								}`}
							/>
						)}
					</button>
				)}
			</div>
			<p
				className={`absolute text-rose-500 text-xs pl-2 mt-0.5 ${
					isError ? 'opacity-100' : 'opacity-0'
				} transition-all`}
			>
				<>{errors[name]?.message || ''}</>
			</p>
		</div>
	);
};

export default Input;

// import {
// 	EyeIcon,
// 	EyeSlashIcon,
// 	XCircleIcon,
// } from '@heroicons/react/24/solid';
// import React, { useState } from 'react';
// import { useFormContext } from 'react-hook-form';
// import { z } from 'zod';

// interface InputProps {
// 	name: string;
// 	label?: string;
// 	schema: z.Schema<unknown>;
// 	type?: 'text' | 'email' | 'password' | string;
// 	placeholder?: string;
// 	allowClear?: boolean;
// }

// const Input: React.FC<InputProps> = ({
// 	name,
// 	label,
// 	schema,
// 	type = 'text',
// 	placeholder,
// 	allowClear = false,
// }) => {
// 	const {
// 		register,
// 		formState: { errors },
// 	} = useFormContext();
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [value, setValue] = useState('');

// 	const handleTogglePassword = () => {
// 		setShowPassword(!showPassword);
// 	};

// 	const isError = !!errors[name] as boolean;

// 	return (
// 		<div className={`mb-2 w-full relative`}>
// 			<label
// 				htmlFor={name}
// 				className='pl-2 mb-1 block text-sm font-medium text-gray-700'
// 			>
// 				{label}
// 			</label>
// 			<div className='relative'>
// 				<input
// 					{...register(name)}
// 					{...{ schema }}
// 					type={showPassword ? 'text' : type}
// 					id={name}
// 					className={`w-full text-slate-700 shadow-sm border ${
// 						isError
// 							? 'border-rose-500 focus:border-rose-500'
// 							: 'border-transparent focus:border-indigo-500'
// 					} focus:ring-indigo-500  focus:outline-none sm:text-sm rounded-md py-2 px-3 placeholder:text-slate-400`}
// 					placeholder={placeholder}
// 					value={value}
// 					onChange={(e) => setValue(e.target.value)}
// 				/>
// 				{type === 'password' && (
// 					<button
// 						type='button'
// 						className='absolute top-1/2 right-3 transform -translate-y-1/2'
// 						onClick={handleTogglePassword}
// 					>
// 						{showPassword ? (
// 							<EyeSlashIcon
// 								className={`h-5 w-5 ${
// 									isError ? 'text-rose-400' : 'text-slate-400'
// 								}`}
// 							/>
// 						) : (
// 							<EyeIcon
// 								className={`h-5 w-5 ${
// 									isError ? 'text-rose-400' : 'text-slate-400'
// 								}`}
// 							/>
// 						)}
// 					</button>
// 				)}
// 				{type !== 'password' && allowClear && value.length > 0 && (
// 					<button
// 						type='button'
// 						className='absolute top-1/2 right-3 transform -translate-y-1/2'
// 						onClick={() => setValue('')}
// 					>
// 						<XCircleIcon
// 							className={`h-5 w-5 ${
// 								isError ? 'text-rose-400' : 'text-slate-400'
// 							}`}
// 						/>
// 					</button>
// 				)}
// 			</div>
// 			<p
// 				className={`text-rose-500 text-xs pl-2 mt-0.5 ${
// 					isError ? 'opacity-100' : 'opacity-0'
// 				} transition-all`}
// 			>
// 				<>{errors[name]?.message || 'non'}</>
// 			</p>
// 		</div>
// 	);
// };

// export default Input;
