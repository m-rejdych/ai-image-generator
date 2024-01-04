import type { RequestHandler } from 'express';
import type { RoleType } from '@prisma/client';

import { generateApiKey } from '../controllers/auth';
import { getApiKey } from '../util/auth';
import { createError } from '../util/error';
import { generateApiKeySchema, loginSchema } from '../schemas/auth';
import type { ResultResBody } from '../types/response';

interface GenerateApiKeyResBody {
  apiKey: string;
}

interface GenerateApiKeyReqBody {
  roleType: RoleType;
  limit?: number;
}

interface LoginReqBody {
  apiKey: string;
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 1000;

export const generateApiKeyHandler: RequestHandler<
  Record<string, never>,
  GenerateApiKeyResBody,
  GenerateApiKeyReqBody
> = async (req, res, next) => {
  try {
    const data = await generateApiKeySchema.parseAsync(req.body);

    const apiKey = await generateApiKey(data);

    res.json({ apiKey });
  } catch (error) {
    next(error);
  }
};

export const loginHandler: RequestHandler<
  Record<string, never>,
  ResultResBody<null>,
  LoginReqBody
> = async (req, res, next) => {
  try {
    const data = await loginSchema.parseAsync(req.body);

    const apiKey = await getApiKey(data.apiKey);
    if (!apiKey) {
      throw createError('Not authorized', 401);
    }

    req.apiKeyId = apiKey.id;
    res.cookie('apiKey', data.apiKey, {
      httpOnly: true,
      maxAge: COOKIE_MAX_AGE,
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DOMAIN : undefined,
      sameSite: 'strict',
    });

    res.json({ result: 'success', data: null });
  } catch (error) {
    next(error);
  }
};

export const logoutHandler: RequestHandler<Record<string, never>, ResultResBody<null>> = (
  _,
  res,
) => {
  res.clearCookie('apiKey');
  res.json({ result: 'success', data: null });
};
