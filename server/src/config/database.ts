import mongoose from 'mongoose';
import { logger } from '../utils';

export const connect = async (url: string) => {
	try {
		await mongoose.connect(url);
		logger.info('Database connected');
	} catch (error) {
		logger.error('Error connecting to MongoDB:', error);
	}
};

export const disconnect = async () => {
	try {
		await mongoose.disconnect();
		logger.info('Database disconnected');
	} catch (error) {
		logger.error('Database disconnection error', error);
	}
};

export default mongoose;