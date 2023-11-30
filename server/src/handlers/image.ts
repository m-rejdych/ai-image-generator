import { RequestHandler } from 'express';

export const generateImageHandler: RequestHandler = async (_, res, next) => {
  try {
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
