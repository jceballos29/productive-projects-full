import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config';

export type Payload = {
	id: string;
	role: string;
	// session: string;
};

export const signToken = (
	payload: Payload,
	options?: jwt.SignOptions | undefined,
) => {
	return jwt.sign(payload, env.JWT_SECRET, {
		...(options && options),
		algorithm: 'HS256',
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, env.JWT_SECRET, {
		algorithms: ['HS256'],
	});
};
