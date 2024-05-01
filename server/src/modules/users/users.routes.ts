import { Router } from 'express';
import {
	authenticate,
	authorization,
	validate,
} from '../../middleware';
import * as UserController from './users.controller';
import { UserRole } from './users.model';
import {
	createManyUsersSchema,
	createUserSchema,
	deleteUserSchema,
	findUsersSchema,
	getUserSchema,
	updateUserSchema,
} from './users.schema';

const router = Router();

router.post(
	'/',
	[
		authenticate,
		authorization([UserRole.ADMIN]),
		validate(createUserSchema),
	],
	UserController.create,
);
router.post(
	'/many',
	[
		authenticate,
		authorization([UserRole.ADMIN]),
		validate(createManyUsersSchema),
	],
	UserController.createMany,
);
router.get(
	'/:userId',
	[
		authenticate,
		authorization([UserRole.ADMIN]),
		validate(getUserSchema),
	],
	UserController.findOne,
);
router.get(
	'/',
	[
		authenticate,
		authorization([UserRole.ADMIN]),
		validate(findUsersSchema),
	],
	UserController.find,
);
router.patch(
	'/:userId',
	[
		authenticate,
		authorization([UserRole.ADMIN]),
		validate(updateUserSchema),
	],
	UserController.update,
);
router.delete(
	'/:userId',
	[
		authenticate,
		authorization([UserRole.ADMIN]),
		validate(deleteUserSchema),
	],
	UserController.remove,
);

export default router;
