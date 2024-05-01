import * as UserService from './users.service';
import { Request, Response } from 'express';
import {
	CreateUserInput,
	CreateManyUsersInput,
	GetUserInput,
	FindUsersInput,
} from './users.schema';
import { httpResponses } from '../../utils';

export const create = async (
	req: Request<{}, {}, CreateUserInput['body']>,
	res: Response,
): Promise<void> => {
	try {
		const user = await UserService.create(req.body);
		httpResponses.Created(res, 'User created successfully', user);
	} catch (error: any) {
		httpResponses.InternalServerError(res, error);
	}
};

export const createMany = async (
	req: Request<{}, {}, CreateManyUsersInput['body']>,
	res: Response,
): Promise<void> => {
	try {
		const users = await UserService.createMany(req.body);
		httpResponses.Created(res, 'Users created successfully', users);
	} catch (error: any) {
		httpResponses.InternalServerError(res, error);
	}
};

export const findOne = async (
	req: Request<GetUserInput['params']>,
	res: Response,
): Promise<void> => {
	try {
		const user = await UserService.findOne({
			_id: req.params.userId,
		});
		if (!user) {
			httpResponses.NotFound(res, 'User not found');
			return;
		}
		httpResponses.OK(res, 'User found', user);
	} catch (error: any) {
		httpResponses.InternalServerError(res, error);
	}
};

export const find = async (
	req: Request<{}, FindUsersInput['query'], {}>,
	res: Response,
): Promise<void> => {
	try {
		const page =
			typeof req.query.page === 'string'
				? parseInt(req.query.page)
				: 1;
		const limit =
			typeof req.query.limit === 'string'
				? parseInt(req.query.limit)
				: 10;
		const skip = (page - 1) * limit;
		const order = req.query.order === 'desc' ? -1 : 1;
		const sort = req.query.sort
			? (req.query.sort as string)
			: 'createdAt';

		const query = req.query.search
		? {
				$or: [
					{
						name: {
							$regex: req.query.search,
							$options: 'i',
						},
					},
					{
						email: {
							$regex: req.query.search,
							$options: 'i',
						},
					},
				],
			}
		: {}

		const users = await UserService.find(
			query,
			{
				page,
				limit,
				sort: {
					[sort]: order,
				},
			},
		);
		httpResponses.OK(res, 'Users found', users);
	} catch (error: any) {
		httpResponses.InternalServerError(res, error);
	}
};

export const update = async (
	req: Request<GetUserInput['params'], {}, CreateUserInput['body']>,
	res: Response,
): Promise<void> => {
	try {
		const user = await UserService.update(
			{ _id: req.params.userId },
			req.body,
		);
		if (!user) {
			httpResponses.NotFound(res, 'User not found');
			return;
		}
		httpResponses.OK(res, 'User updated successfully', user);
	} catch (error: any) {
		httpResponses.InternalServerError(res, error);
	}
};

export const remove = async (
	req: Request<GetUserInput['params']>,
	res: Response,
): Promise<void> => {
	try {
		const user = await UserService.remove({ _id: req.params.userId });
		if (!user) {
			httpResponses.NotFound(res, 'User not found');
			return;
		}
		httpResponses.OK(res, 'User removed successfully', user);
	} catch (error: any) {
		httpResponses.InternalServerError(res, error);
	}
};
