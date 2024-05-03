import { validatePassword, findOne as findOneUser } from '../users/users.service';
import { Request, Response } from 'express';
import { httpResponses, signToken } from '../../utils';
import { LoginInput, RefreshInput } from './auth.schema';
import * as AuthService from './auth.service';

export const login = async (
	req: Request<{}, {}, LoginInput['body']>,
	res: Response,
): Promise<void> => {
	try {
		console.log({body: req.body})
		const user = await validatePassword(req.body);
		if (!user) {
			httpResponses.Unauthorized(res, 'Invalid email or password');
			return;
		}

		// const session = await AuthService.create({
		// 	user: user._id,
		// 	agent: req.headers['user-agent'] || '',
		// 	ip: req.ip || '',
		// });

		const accessToken = signToken(
			{
				id: user._id,
				role: user.role,
				// session: session._id,
			},
			{
				expiresIn: '15m',
			},
		);

		const refreshToken = signToken(
			{
				id: user._id,
				role: user.role,
				// session: session._id,
			},
			{
				expiresIn: '7d',
			},
		);

		user.set('password', null, { strict: false });

		httpResponses.OK(res, 'User logged in', {
			accessToken,
			refreshToken,
			user,
		});
	} catch (error: any) {
		console.log(error);
		httpResponses.InternalServerError(res, error);
	}
};

export const logout = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const session = await AuthService.findOne({
			_id: res.locals.user.session,
		});

		if (!session) {
			httpResponses.NotFound(res, 'Session not found');
			return;
		}
		await AuthService.update({ _id: session._id }, { valid: false });
		res.locals.user = undefined;

		httpResponses.OK(res, 'User logged out', {});
	} catch (error: any) {
		console.log(error);
		httpResponses.InternalServerError(res, error.message);
	}
};

export const refresh = async (
	req: Request<{}, {}, RefreshInput['body']>,
	res: Response,
): Promise<void> => {
	try {
		const newAccessToken = await AuthService.reIssueAccessToken(
			req.body.refreshToken,
		);

		if (!newAccessToken) {
			httpResponses.Unauthorized(res, 'Invalid refresh token');
			return;
		}

		httpResponses.OK(res, 'Token refreshed', {
			accessToken: newAccessToken,
			refreshToken: req.body.refreshToken,
		});
	} catch (error: any) {
		httpResponses.InternalServerError(res, error.message);
	}
};

export const me = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await findOneUser({ _id: res.locals.user.id });
		if (!user) {
			httpResponses.Empty(res, 'User not found');
			return;
		}
		httpResponses.OK(res, 'User found', user);
	} catch (error: any) {
		httpResponses.InternalServerError(res, error.message);
	}
};
