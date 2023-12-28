import { RequestHandler } from 'express';

import {
  generateImage,
  deleteImage,
  getImages,
  type GetImagesData,
  type GetImagesOptions,
} from '../controllers/image';
import { generateImageSchema } from '../schemas/image';
import { createError } from '../util/error';
import type { ResultResBody } from '../types/response';

type GenerateImageResData = {
  url: string;
};

type GetImagesResData = {
  images: GetImagesData;
};

type DeleteImageQuery = {
  imageId?: string;
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

export const deleteImageHandler: RequestHandler<
  Record<string, never>,
  ResultResBody<null>,
  never,
  DeleteImageQuery
> = async (req, res, next) => {
  try {
    const { imageId } = req.query;
    if (!imageId) {
      throw createError('"imageId" query is required', 400);
    }

    const result = await deleteImage(req.apiKeyId, imageId);

    res.json({ result: result ? 'success' : 'failure', data: null });
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
