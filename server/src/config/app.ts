import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';

import { deserialize, request } from '../middleware';
import { httpResponses } from '../utils';

import routes from '../modules';

export const buildApp = () => {
	const app: Application = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(helmet());

	app.use(request);
	app.use(deserialize);

	app.get('/health', (_req: Request, res: Response) => {
		return httpResponses.OK(res, 'Server is up and running', null);
	});

	app.use('/api', routes);

	app.use((_req: Request, res: Response) => {
		return httpResponses.NotFound(res, 'Route not found');
	});

	return app;
};
