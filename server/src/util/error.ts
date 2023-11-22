import type { ErrorRequestHandler } from 'express';

interface ExtendedError extends Error {
  status: number;
}

export const createError = (message: string, status = 500): Error => {
  const error = new Error(message) as ExtendedError;
  error.status = status;

  return error;
};

export const genericErrorHandler: ErrorRequestHandler = (
  error: ExtendedError | Error,
  _,
  res,
  __,
) => {
  console.log(error);

  const parsedMessage = (() => {
    try {
      return JSON.parse(error.message);
    } catch {
      return null;
    }
  })();

  const status = 'status' in error ? error.status : 500;
  res.status(status).json({ message: parsedMessage ?? error.message, status });
};
