import { Router } from 'express';

import { generateImageHandler, getImagesHandler } from '../handlers/image';

export const router = Router();

router.post('/generate', generateImageHandler);

router.get('/list', getImagesHandler);
