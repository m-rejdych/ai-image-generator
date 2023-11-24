import type { RequestHandler } from 'express';

import { getSecretFromBearerHeader, getApiKey } from '../util/auth';
import { createError } from '../util/error';

export const validateAuthorizationSecretKey: RequestHandler = (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw createError('Forbidden', 403);

  const secretKey = getSecretFromBearerHeader(authorization);
  if (secretKey !== process.env.SECRET_KEY) throw createError('Forbidden', 403);

  next();
};

export const validateAuthorizationApiKey: RequestHandler = async (req, _, next) => {
  const {apiKey: apiKeyCookie} = req.cookies;
  if (!apiKeyCookie) throw createError('Forbidden', 403);

  const apiKey = await getApiKey(apiKeyCookie);
  if (!apiKey) {
    throw createError('Forbidden', 403);
  }

  req.apiKeyId = apiKey.id;

  next();
};
