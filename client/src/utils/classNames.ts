import clsx, { ClassValue } from 'clsx'
import { twMerge} from 'tailwind-merge'

// export const classNames = (...classes: (string | undefined)[]) => {
// 	return classes.filter(Boolean).join(' ');
// };

export const classNames = (...classes: ClassValue[]) => twMerge(clsx(classes));