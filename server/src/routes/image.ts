import { Router } from 'express';

import { generateImageHandler } from '../handlers/image';

export const router = Router();

router.post('/generate', generateImageHandler);
