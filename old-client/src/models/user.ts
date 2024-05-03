export interface UserResponse {
  _id: string;
	name: string;
	email: string;
	password: string | null;
	role: string;
	createdAt: string;
	updatedAt: string;
}

export interface User {
  id: string;
	name: string;
	email: string;
	role: string;
	avatar: string | null;
	createdAt: string;
	updatedAt: string;
}
