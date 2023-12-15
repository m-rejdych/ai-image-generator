import type { RequestHandler } from 'express';

import { prisma } from '../util/prisma';
import { createError } from '../util/error';

export const validateLimit: RequestHandler = async (req, _, next) => {
  try {
    const apiKey = await prisma.apiKey.findUnique({ where: { id: req.apiKeyId }, include: { limit: true } });
    if (!apiKey) {
      return next(createError('API key not found', 404));
    }

    if (apiKey.limit === null) return next();

    const { max, current } = apiKey.limit;

    if (current >= max) {
      return next(createError('Limit reached', 403));
    }

    next();
  } catch (error) {
    next(error);
  }
};
