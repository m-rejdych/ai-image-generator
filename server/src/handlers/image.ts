import { RequestHandler } from 'express';

import { generateImage, getImages, type GetImagesData, type GetImagesOptions } from '../controllers/image';
import { generateImageSchema } from '../schemas/image';
import type { ResultResBody } from '../types/response';

type GenerateImageResData = {
  url: string;
};

type GetImagesResData = {
  images: GetImagesData;
};

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

export const getImagesHandler: RequestHandler<
  Record<string, never>,
  ResultResBody<GetImagesResData>,
  never,
  GetImagesOptions
> = async (req, res, next) => {
  try {
    const images = await getImages(req.apiKeyId, req.query);

    res.json({ result: 'success', data: { images } });
  } catch (error) {
    next(error);
  }
};
