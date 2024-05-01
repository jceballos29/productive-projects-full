import UserModel from './modules/users/users.model';
import { logger } from './utils';

export const seed = async () => {
	try {
		const existingUser = await UserModel.findOne({
			email: 'administrator@mail.com',
		});

		if (!existingUser) {
			await UserModel.create({
				name: 'Administrator',
				email: 'administrator@mail.com',
				password: 'administrator123',
				role: 'admin',
			});
			logger.info('User "administrator" created successfully.');
		} else {
			logger.info('User "administrator" already exists.');
		}
	} catch (error: any) {
		logger.error(`Error while seeding: ${error.message}`);
	}
};
