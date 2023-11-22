import type { PrismaClient } from '@prisma/client';


declare global {
  var prisma: PrismaClient;

  declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      HOST: string;
      NODE_ENV: 'production' | 'development';
      GENERATE_API_KEY_ENDPOINT: string;
      SECRET_KEY: string;
    }
  }

  declare namespace Express {
    interface Request {
      apiKeyId: string;
    }
  }
}
