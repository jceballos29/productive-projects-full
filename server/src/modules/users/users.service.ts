import mongoose from '../../config/database';
import UserModel, { UserDocument, User} from './users.model';

export const create = async (data: User): Promise<UserDocument> => {
	return UserModel.create(data);
};

export const findOne = async (
	query: mongoose.FilterQuery<UserDocument>,
	options: mongoose.QueryOptions = { lean: true },
): Promise<UserDocument | null> => {
	return await UserModel.findOne(query, {}, options);
};

export const find = async (
	query: mongoose.FilterQuery<UserDocument>,
	options: mongoose.QueryOptions = { lean: true },
): Promise<UserDocument[]> => {
	return await UserModel.find(query, {}, options);
};

export const update = async (
	query: mongoose.FilterQuery<UserDocument>,
	update: mongoose.UpdateQuery<UserDocument>,
	options: mongoose.QueryOptions = { new: true },
): Promise<UserDocument | null> => {
	return await UserModel.findOneAndUpdate(query, update, options);
};

export const remove = async (
	query: mongoose.FilterQuery<UserDocument>,
): Promise<UserDocument | null> => {
	return await UserModel.findOneAndDelete(query);
};

export const validatePassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<UserDocument | null> => {
	const user = await UserModel.findOne({ email }).select('+password');
	if (!user) return null;
	const isValid = await user.comparePassword(password);
	if (!isValid) return null;
	return user;
};