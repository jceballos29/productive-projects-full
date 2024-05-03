import { buildApp } from './config';
import http from 'http';
import { logger } from './utils';
import { env, connect, disconnect } from './config';
import { seed } from './seed';
import socketIO from 'socket.io';

const main = async () => {
	const app = buildApp();
	const server: http.Server = http.createServer(app);
	const io = new socketIO.Server(server);

	server.listen(env.PORT, async () => {
		logger.info(`Server running on port ${env.PORT}`);
		await connect(env.MONGO_URI);
		await seed();
	});

	io.on('connection', (socket) => {
		logger.info('A user connected');
		socket.on('disconnect', () => {
			logger.info('User disconnected');
		});
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
