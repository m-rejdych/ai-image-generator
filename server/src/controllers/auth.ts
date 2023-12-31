import { randomUUID } from 'crypto';
import type { RoleType } from '@prisma/client';

import { prisma } from '../util/prisma';
import { sha256 } from '../util/auth';
import { createError } from '../util/error';

interface GenerateApiKeyData {
  roleType: RoleType;
  limit?: number;
}

export const generateApiKey = async ({ roleType, limit }: GenerateApiKeyData): Promise<string> => {
  const role = await prisma.role.findUnique({ where: { type: roleType } });
  if (!role) {
    throw createError('Role type not found', 500);
  }

  const id = randomUUID();
  const hash = sha256(id);

  const apiKey = await prisma.apiKey.create({ data: { hash, roleId: role.id } });

  if (limit) {
    await prisma.limit.create({ data: { max: limit, apiKeyId: apiKey.id } });
  }

  return id;
}
