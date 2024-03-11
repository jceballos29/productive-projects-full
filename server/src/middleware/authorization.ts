import { NextFunction, Request, Response } from 'express';
import { httpResponses } from '../utils';

export const authorization = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.user;
    if (!roles.includes(role)) {
      httpResponses.Forbidden(res, 'User does not have permission');
      return;
    }
    return next();
  };
}