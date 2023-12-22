import { decapitalize } from './formatting';

export type ParsedCookie = Record<string, string | boolean>;

export const parseCookie = (cookie: string): ParsedCookie => {
  if (!cookie) return {};

  const chunks = cookie.split(';').map((chunk) => chunk.trim().split('='));

  const result = chunks.reduce<ParsedCookie>((acc, [key, value]) => {
    acc[decapitalize(key).replaceAll('-', '')] = value === undefined ? true : value;
    return acc;
  }, {});

  return result;
};
