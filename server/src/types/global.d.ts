import type { PrismaClient } from '@prisma/client';
import type { Dropbox } from 'dropbox';


declare global {
  var prisma: PrismaClient;
  var dbx: Dropbox;

  declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      HOST: string;
      NODE_ENV: 'production' | 'development';
      GENERATE_API_KEY_ENDPOINT: string;
      OPEN_AI_API_KEY: string;
      SECRET_KEY: string;
      CLIENT_URL: string;
      DROPBOX_REFRESH_TOKEN: string;
      DROPBOX_APP_KEY: string;
      DROPBOX_APP_SECRET: string;
    }
  }

  declare namespace Express {
    interface Request {
      apiKeyId: string;
    }
  }
}
