import React from 'react';
import { classNames } from '../../utils/classNames';

export interface ButtonProps {
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'default' | 'primary' | 'text';
	size?: 'sm' | 'md' | 'lg';
	icon?: React.ReactNode;
	loading?: boolean;
	fullWidth?: boolean;
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	danger?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	disabled = false,
	className,
	type = 'button',
	variant = 'default',
	size = 'md',
	loading = false,
	icon,
	fullWidth = false,
	rounded = 'md',
	danger = false,
}) => {
	const getSizeClass = () => {
		switch (size) {
			case 'sm':
				return 'h-8 px-3 gap-1 text-sm';
			case 'lg':
				return 'h-12 px-6 gap-3 text-lg';
			default:
				return 'h-10 px-4 gap-2 text-base';
		}
	};

	const getRoundedClass = () => {
		switch (rounded) {
			case 'none':
				return 'rounded-none';
			case 'sm':
				return 'rounded-sm';
			case 'md':
				return 'rounded-md';
			case 'lg':
				return 'rounded-lg';
			case 'full':
				return 'rounded-full';
			default:
				return 'rounded-md';
		}
	};

	const getVariantClass = () => {
		switch (variant) {
			case 'primary':
				return `${
					danger
						? 'shadow-sm bg-rose-500 hover:bg-rose-400 hover:border-rose-400 active:bg-rose-600 border-rose-500'
						: 'shadow-sm bg-indigo-500 hover:bg-indigo-400 hover:border-indigo-400 active:bg-indigo-600 border-indigo-500'
				} text-white`;
			case 'text':
				return `${
					danger
						? 'text-rose-500 shadow-none border-transparent hover:bg-rose-100 active:bg-rose-200'
						: 'text-salte-600 shadow-none border-transparent hover:bg-slate-300 active:bg-slate-400'
				}`;
			case 'default':
			default:
				return `${
					danger
						? 'shadow-sm text-rose-500 border-rose-500 hover:border-rose-400 hover:text-rose-400 active:border-rose-700 active:text-rose-700'
						: 'shadow-sm bg-white text-slate-600 border-slate-300 hover:border-indigo-500 hover:text-indigo-500 active:border-indigo-600 active:text-indigo-600'
				}`;
		}
	};

	const iconSize = () => {
		switch (size) {
			case 'sm':
				return 'w-4 h-4';
			case 'lg':
				return 'w-5 h-5';
			default:
				return 'w-4 h-4';
		}
	};

	const getIconClone = (icon: React.ReactNode) =>
		React.isValidElement(icon)
			? 
			React.cloneElement(icon as React.ReactElement, {
				'aria-hidden': true,
				focusable: false,
				className: classNames(
					'flex-shrink-0',
					iconSize(),
					loading ? 'opacity-0 hidden' : 'opacity-100 visible',
				),
			})
			: null;

	const iconClone = getIconClone(icon);

	return (
		<button
			className={classNames(
				className || '',
				getSizeClass(),
				getVariantClass(),
				getRoundedClass(),
				fullWidth ? 'w-full' : 'w-auto',
				'select-none flex items-center border justify-center font-medium transition-all duration-300 hover:transition-all hover:duration-200 ease-in-out outline-none focus:outline-none active:outline-none ',
				disabled
					? 'disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500'
					: '',
				'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:shadow-none disabled:shadow-none',
			)}
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
		>
			{loading && (
				<span
					className={`
        flex relative rounded-full border-2 border-t-transparent animate-spin
        ${iconSize()}
      `}
				/>
			)}
			{iconClone && iconClone}
			{children}
		</button>
	);
};

export default Button;
