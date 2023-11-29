import type { ResultResBody } from '../types/response';

export const login = async (apiKey: string): Promise<boolean> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey }),
    credentials: 'include',
    cache: 'no-store',
  });

  const data: ResultResBody = await response.json();

  return data.result === 'success';
}
