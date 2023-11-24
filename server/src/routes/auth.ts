import { Router } from 'express';

import { generateApiKeyHandler, loginHandler } from '../handlers/auth';
import { validateAuthorizationSecretKey } from '../middleware/auth';

export const router = Router();

router.post(
  process.env.GENERATE_API_KEY_ENDPOINT,
  validateAuthorizationSecretKey,
  generateApiKeyHandler,
);

router.put('/login', loginHandler);
