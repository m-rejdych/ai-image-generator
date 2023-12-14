import type { ResultResBody } from '../types/response';

export interface Image {
  id: string;
  url: string;
  name: string;
}

type GenerateImageResData = {
  url: string;
};

type GetImagesResData = {
  images: Image[];
}

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

  const { data }: ResultResBody<GenerateImageResData> = await response.json();

  return data.url;
};

export const getImages = async (cookie?: string): Promise<Image[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/list?sort=desc`, {
    credentials: 'include',
    headers: cookie ? { Cookie: cookie } : undefined,
  });

  const { data } = await response.json() as ResultResBody<GetImagesResData>;

  return data.images;
};
