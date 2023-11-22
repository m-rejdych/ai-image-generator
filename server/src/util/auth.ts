import { createHash } from 'crypto';

export const sha256 = (key: string): string => createHash('sha256').update(key).digest('hex');

export const getSecretFromBearerHeader = (headerValue: string): string | null => {
  const isValidBearer = /^Bearer .+$/.test(headerValue);
  if (!isValidBearer) return null;

  const [, secret] = headerValue.split(' ');

  return secret;
};
