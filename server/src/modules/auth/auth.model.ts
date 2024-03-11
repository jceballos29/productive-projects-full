import mongoose from '../../config/database';
import { UserDocument } from '../users/users.model';

export interface Session {
	user: UserDocument['_id'];
	agent: string;
	ip: string;
	valid?: boolean;
}

export interface SessionDocument extends Session, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		agent: {
			type: String,
			required: true,
		},
		ip: {
			type: String,
			required: true,
		},
		valid: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const SessionModel = mongoose.model<SessionDocument>(
	'Session',
	sessionSchema,
);

export default SessionModel;
