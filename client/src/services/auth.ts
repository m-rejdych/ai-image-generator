import type { ResultResBody } from '../types/response';

interface LoginResult {
  isAuth: boolean;
  apiKeyCookie: string;
}

export const login = async (apiKey: string): Promise<LoginResult> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey }),
    credentials: 'include',
    cache: 'no-store',
  });

  const data: ResultResBody<null> = await response.json();
  const isAuth = data.result === 'success';

  const apiKeyCookie =
    response.headers.getSetCookie().find((cookie) => cookie.includes('apiKey=')) ?? '';

  return {
    isAuth,
    apiKeyCookie,
  };
};
