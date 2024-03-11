import { buildApp } from './config';
import http, { Server } from 'http';
import { logger } from './utils';
import { env, connect, disconnect } from './config';

const main = async () => {
	const app = buildApp();
	const server: Server = http.createServer(app);

	server.listen(env.PORT, async () => {
		logger.info(`Server running on port ${env.PORT}`);
		await connect(env.MONGO_URI);
	});

	const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

	signals.forEach((signal) => {
		process.on(signal, async () => {
			logger.info(`Received ${signal}`);
			await disconnect();
			server.close();
			process.exit(0);
		});
	});
};

main();