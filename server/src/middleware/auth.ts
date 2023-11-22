import type { RequestHandler } from 'express';

import { getSecretFromBearerHeader } from '../util/auth';
import { createError } from '../util/error';
import { sha256 } from '../util/auth';
import { prisma } from '../util/prisma';

export const validateAuthorizationSecretKey: RequestHandler = (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw createError('Forbidden', 403);

  const secretKey = getSecretFromBearerHeader(authorization);
  if (secretKey !== process.env.SECRET_KEY) throw createError('Forbidden', 403);

  next();
};

export const validateAuthorizationApiKey: RequestHandler = async (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw createError('Forbidden', 403);

  const apiKeyValue = getSecretFromBearerHeader(authorization);
  if (!apiKeyValue) {
    throw createError('Forbidden', 403);
  }

  const hash = sha256(apiKeyValue);

  const apiKey = await prisma.apiKey.findUnique({ where: { hash } });
  if (!apiKey) {
    throw createError('Forbidden', 403);
  }

  req.apiKeyId = apiKey.id;

  next();
};
