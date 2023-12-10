import type { ResultResBody } from '../types/response';

type GenerateImageResData = {
  url: string;
};

export const generateImage = async (
  name: string,
  prompt: string,
  style?: 'vivid' | 'natural',
): Promise<string> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, prompt, style }),
  });

  const resData: ResultResBody<GenerateImageResData> = await response.json();

  return resData.data.url;
};
