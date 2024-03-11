import { Router } from 'express';
import * as UserController from './users.controller';
import {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
	deleteUserSchema,
} from './users.schema';
import {
	validate,
	authenticate,
	authorization,
} from '../../middleware';
import { UserRole } from './users.model';

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
	[authenticate, authorization([UserRole.ADMIN])],
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
