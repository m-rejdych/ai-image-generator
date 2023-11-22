import type { PrismaClient } from '@prisma/client';

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    HOST: string;
    NODE_ENV: 'production' | 'development';
  }
}

declare global {
  var prisma: PrismaClient;
}
