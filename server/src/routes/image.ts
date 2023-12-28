import { Router } from 'express';

import { generateImageHandler, deleteImageHandler, getImagesHandler } from '../handlers/image';
import { validateLimit } from '../middleware/image';

export const router = Router();

router.post('/generate', validateLimit, generateImageHandler);

router.delete('/delete', deleteImageHandler);

router.get('/list', getImagesHandler);
