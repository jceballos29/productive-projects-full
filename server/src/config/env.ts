import { z } from 'zod';
import zennv from 'zennv';


const schema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	PORT: z.number().default(3000),
	MONGO_URI: z.string().default('mongodb://localhost:27017/'),
	HOSTNAME: z.string(),
	SALT_ROUNDS: z.number().default(10),
	SESSION_SECRET: z.string(),
	JWT_SECRET: z.string(),
});

export const env = zennv({
	dotenv: true,
	schema,
	data: process.env,
});
