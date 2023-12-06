import { z } from 'zod';
import { RoleType } from '@prisma/client';

type RoleTypes = [RoleType, RoleType];

export const generateApiKeySchema = z.object({
  roleType: z.enum(Object.values(RoleType) as RoleTypes),
});

export const loginSchema = z.object({
  apiKey: z.string(),
});
