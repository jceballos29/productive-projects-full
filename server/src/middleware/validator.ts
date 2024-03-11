import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { httpResponses, logger } from '../utils';

export const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				const messages = error.issues.map((issue) => issue.message);
				return httpResponses.BadRequest(
					res,
					messages.join(', ') || 'Invalid request',
				);
			} else {
				next(error);
			}
		}
	};
