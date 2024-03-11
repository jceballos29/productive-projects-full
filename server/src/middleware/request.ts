import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';

export const request = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const start = Date.now();
	const { method, url } = req;

	res.on('finish', () => {
		const elapsed = Date.now() - start;
		const { statusCode } = res;
		logger.debug(`${method} ${url} - ${statusCode} - ${elapsed}ms`);
	});

	next();
};
