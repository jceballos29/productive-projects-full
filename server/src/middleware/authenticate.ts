import { NextFunction, Request, Response } from 'express';
import { httpResponses } from '../utils';

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (!res.locals.user) {
		httpResponses.Unauthorized(res, 'User not authenticated');
		return;
	}

	return next();
};
