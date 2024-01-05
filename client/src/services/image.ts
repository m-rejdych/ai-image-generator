import type { ResultResBody } from '../types/response';
import type { Style } from '@/constants/image';

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
};

export const generateImage = async (
  name: string,
  prompt: string,
  style?: Style,
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

export const deleteImage = async (imageId: string): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/image/delete?imageId=${imageId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  const { result }: ResultResBody<null> = await response.json();

  return result === 'success';
};

export const getImages = async (cookie?: string): Promise<Image[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/list?sort=desc`, {
    credentials: 'include',
    headers: cookie ? { Cookie: cookie } : undefined,
  });

  const { data } = (await response.json()) as ResultResBody<GetImagesResData>;

  return data.images;
};
