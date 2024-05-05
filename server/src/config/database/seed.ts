import UserModel from '../../modules/users/users.model';
import { logger } from '../../utils';

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
			logger.info('El usuario "administrator" ha sido creado.');
		} else {
			logger.info('El usuario "administrator" ya existe.');
		}
	} catch (error: any) {
		logger.error(`Error al ejecutar el seed: ${error.message}`);
	}
};
