import { z } from 'zod';
import { RoleType } from '@prisma/client';

export const generateApiKeySchema = z.object({
  roleType: z.custom<RoleType>((value) => Object.values(RoleType).includes(value as RoleType), {
    message: 'roleType must be one of the following: "User", "Admin"',
  }),
});

export const loginSchema = z.object({
  apiKey: z.string(),
});
