import bcrypt from 'bcrypt';
import mongoose from '../../config/database';
import { env } from '../../config/env';

export enum UserRole {
	ADMIN = 'admin',
	COORDINATOR = 'coordinator',
	MANAGER = 'manager',
	USER = 'user',
}

export interface User {
	name: string;
	email: string;
	password: string;
	role: UserRole;
}

export interface UserDocument extends User, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.USER,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

UserSchema.pre<UserDocument>('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	try {
		const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
		this.password = await bcrypt.hash(this.password, salt);
		return next();
	} catch (error: any) {
		return next(error);
	}
});

UserSchema.methods.comparePassword = async function (
	candidatePassword: string,
) {
	return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
