import { randomUUID } from 'crypto';
import type { RoleType } from '@prisma/client';

import { prisma } from '../util/prisma';
import { dbx } from '../util/dropbox';
import { sha256 } from '../util/auth';
import { createError } from '../util/error';

export const generateApiKey = async (roleType: RoleType): Promise<string> => {
  const role = await prisma.role.findUnique({ where: { type: roleType } });
  if (!role) {
    throw createError('Role type not found', 500);
  }

  const id = randomUUID();
  const hash = sha256(id);

  const apiKey = await prisma.apiKey.create({ data: { hash, roleId: role.id } });
  await dbx.filesCreateFolderV2({ path: `/${apiKey.id}` });

  return id;
}
