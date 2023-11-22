import type { RequestHandler } from 'express';

import { getSecretFromBearerHeader } from '../util/auth';
import { createError } from '../util/error';

export const validateAuthorizationSecretKey: RequestHandler = (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw createError('Forbidden', 403);

  const secretKey = getSecretFromBearerHeader(authorization);
  if (secretKey !== process.env.SECRET_KEY) throw createError('Forbidden', 403);

  next();
};
