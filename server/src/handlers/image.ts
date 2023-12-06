import { RequestHandler } from 'express';

import { generateImage, type GenerateImageData } from '../controllers/image';
import { generateImageSchema } from '../schemas/image';

interface GenerateImageResBody {
  url: string;
}

export const generateImageHandler: RequestHandler<
  Record<string, never>,
  GenerateImageResBody,
  GenerateImageData
> = async (req, res, next) => {
  try {
    const data = generateImageSchema.parse(req.body);
    const url = await generateImage(req.apiKeyId, data);
    res.json({ url });
  } catch (error) {
    next(error);
  }
};
