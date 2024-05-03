import { NextFunction, Request, Response } from 'express';
import { httpResponses, verifyToken } from '../utils';
import {
	reIssueAccessToken,
	findOne,
} from '../modules/auth/auth.service';
import { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

export const deserialize = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const accessToken = req.headers.authorization?.replace(
		/^Bearer\s/,
		'',
	);
	
	if (!accessToken) return next();
	const decoded = verifyToken(accessToken) as JwtPayload;
	// const session = await findOne({
	// 	_id: decoded?.session,
	// 	valid: true,
	// });

	// if (session) {
	// 	res.locals.user = decoded;
	// 	res.locals.session = session;
	// }

	if (decoded) {
		res.locals.user = decoded;
	}

	return next();
	// try {

	// } catch (error: any) {
	// 	console.log({error})
	// 	if (error instanceof TokenExpiredError) {
	// 		return httpResponses.Unauthorized(res, 'Token expired');
	// 	}
	// 	return httpResponses.InternalServerError(res, error.message);
	// }
};
