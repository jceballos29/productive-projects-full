import { z } from "zod";
import { UserResponse } from "./user";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export interface LoginRequest {
	email: string;
	password: string;
}
export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	user: UserResponse;
}