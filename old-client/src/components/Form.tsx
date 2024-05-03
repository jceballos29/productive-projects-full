import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { Button } from './ui';

export interface FormProps<T> {
	children?: React.ReactNode;
	schema: z.Schema<unknown>;
	action: (data: T) => Promise<boolean>;
	reset?: boolean;
	loading?: boolean;
	submitText?: string;
}

const Form: React.FC<FormProps<unknown>> = ({
	children,
	schema,
	action,
	reset = false,
	loading = false,
	submitText = 'Submit',
}) => {
	const methods = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: z.infer<typeof schema>) => {
		const result = await action(data);
		if (result) {
			methods.reset();
		}
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className='flex flex-col w-full'
			>
				{children}

				<Button
					type='submit'
					variant='primary'
					className='mt-4'
					loading={loading}
					fullWidth
				>
					{submitText}
				</Button>

				{reset && (
					<Button
						type='reset'
						className='mt-4'
						onClick={() => methods.reset()}
						fullWidth
					>
						Reset
					</Button>
				)}
			</form>
		</FormProvider>
	);
};

export default Form;
