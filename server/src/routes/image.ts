import { Router } from 'express';

import { generateImageHandler, getImagesHandler } from '../handlers/image';
import { validateLimit } from '../middleware/image';

export const router = Router();

router.post('/generate', validateLimit, generateImageHandler);

router.get('/list', getImagesHandler);
