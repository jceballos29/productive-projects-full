import { z } from 'zod';

export const loginSchema = z.object({
	body: z.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email(
				'Email is invalid. Please provide a valid email address',
			),
		password: z.string({
			required_error: 'Password is required',
		}),
	}),
});

export const refreshSchema = z.object({
	body: z.object({
		refreshToken: z.string({
			required_error: 'Refresh token is required',
		}),
	}),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;