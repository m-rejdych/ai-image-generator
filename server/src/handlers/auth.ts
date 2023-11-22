import type { RequestHandler } from 'express';
import type { RoleType } from '@prisma/client';

import { generateApiKey } from '../controllers/auth';
import { generateApiKeySchema } from '../schemas/auth';

interface GenerateApiKeyResBody {
  apiKey: string;
}

interface GenerateApiKeyReqBody {
  roleType: RoleType;
}

export const generateApiKeyHandler: RequestHandler<Record<string, never>, GenerateApiKeyResBody, GenerateApiKeyReqBody> = async (req, res, next) => {
  try {
    const data = await generateApiKeySchema.parseAsync(req.body);

    const apiKey = await generateApiKey(data.roleType);

    res.json({ apiKey });
  } catch (error) {
    next(error);
  }
};
