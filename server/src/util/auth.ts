import { createHash } from 'crypto';
import type { ApiKey } from '@prisma/client';

import { prisma } from './prisma';

export const sha256 = (key: string): string => createHash('sha256').update(key).digest('hex');

export const getSecretFromBearerHeader = (headerValue: string): string | null => {
  const isValidBearer = /^Bearer .+$/.test(headerValue);
  if (!isValidBearer) return null;

  const [, secret] = headerValue.split(' ');

  return secret;
};

export const getApiKey = async (key: string): Promise<ApiKey | null> => {
  const hash = sha256(key);

  const apiKey = await prisma.apiKey.findUnique({ where: { hash } });
  if (!apiKey) return null;

  return apiKey;
};
