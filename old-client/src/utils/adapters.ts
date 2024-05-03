import { User, UserResponse } from '@/models';

export const userAdapter = (data: UserResponse): User => {
	return {
		id: data._id,
		name: data.name,
		email: data.email,
		role: data.role,
		avatar: null,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	};
};
