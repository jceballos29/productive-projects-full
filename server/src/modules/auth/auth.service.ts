import mongoose from '../../config/database';
import { signToken, verifyToken } from '../../utils';
import SessionModel, { Session, SessionDocument } from './auth.model';
import { findOne as findOneUser } from '../users/users.service';
import { JwtPayload } from 'jsonwebtoken';

export const create = async (
	data: Session,
): Promise<SessionDocument> => {
	return SessionModel.create(data);
};

export const findOne = async (
	query: mongoose.FilterQuery<SessionDocument>,
	options: mongoose.QueryOptions = { lean: true },
): Promise<SessionDocument | null> => {
	return await SessionModel.findOne(query, {}, options);
};

export const find = async (
	query: mongoose.FilterQuery<SessionDocument>,
	options: mongoose.QueryOptions = { lean: true },
): Promise<SessionDocument[]> => {
	return await SessionModel.find(query, {}, options);
};

export const update = async (
	query: mongoose.FilterQuery<SessionDocument>,
	update: mongoose.UpdateQuery<SessionDocument>,
	options: mongoose.QueryOptions = { new: true },
): Promise<SessionDocument | null> => {
	return await SessionModel.findOneAndUpdate(query, update, options);
};

export const reIssueAccessToken = async (refreshToken: string) => {
	const decoded = verifyToken(refreshToken) as JwtPayload;

	// const session = await findOne({
	// 	user: decoded?.id,
	// 	valid: true,
	// });

	// if (!session) {
	// 	return null;
	// }

	const user = await findOneUser({ _id: decoded?.id });

	if (!user) {
		return null;
	}

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

	return accessToken;
};
