import { Router } from 'express';
import * as AuthController from './auth.controller';
import { loginSchema, refreshSchema } from './auth.schema';
import { validate, authenticate } from '../../middleware';

const router = Router();

router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', authenticate, AuthController.logout);
router.post('/refresh', validate(refreshSchema), AuthController.refresh);
router.get('/me', authenticate, AuthController.me);

export default router;
