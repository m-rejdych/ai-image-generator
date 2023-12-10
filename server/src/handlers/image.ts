import { RequestHandler } from 'express';

import { generateImage } from '../controllers/image';
import { generateImageSchema } from '../schemas/image';
import type { ResultResBody } from '../types/response';

type GenerateImageResData = {
  url: string;
}

export const generateImageHandler: RequestHandler<
  Record<string, never>,
  ResultResBody<GenerateImageResData>,
  GenerateImageResData
> = async (req, res, next) => {
  try {
    const data = generateImageSchema.parse(req.body);
    const url = await generateImage(req.apiKeyId, data);
    res.json({ result: 'success', data: { url } });
  } catch (error) {
    next(error);
  }
};
