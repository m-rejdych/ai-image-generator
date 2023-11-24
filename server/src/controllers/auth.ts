import { randomUUID } from 'crypto';
import type { RoleType } from '@prisma/client';

import { prisma } from '../util/prisma';
import { sha256 } from '../util/auth';
import { createError } from '../util/error';

export const generateApiKey = async (roleType: RoleType): Promise<string> => {
  const role = await prisma.role.findUnique({ where: { type: roleType } });
  if (!role) {
    throw createError('Role type not found', 500);
  }

  const id = randomUUID();
  const hash = sha256(id);

  await prisma.apiKey.create({ data: { hash, roleId: role.id } });

  return id;
}
