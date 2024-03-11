import { Router } from 'express';
import { readdirSync } from 'fs';
import * as path from 'path';
import { logger } from '../utils';

const router = Router();
const pathModules = __dirname;
const modules = readdirSync(pathModules);

modules.forEach(async (name) => {
	try {
		if (name.includes('index')) return;
		const routePath = path.join(
			pathModules,
			name,
			`${name}.routes.ts`,
		);
		const route = (await import(routePath)).default;
		router.use(`/${name}`, route);
		logger.info(`Load routes: /${name}`);
	} catch (error) {
		logger.error(error);
	}
});

export default router;