import fetch from 'node-fetch';
import { randomUUID } from 'crypto';

import { dbx } from '../util/dropbox';
import { prisma } from '../util/prisma';
import type { Style } from '../schemas/image';

interface GenerateImageRes {
  created: number;
  data: [{ url: string }];
}

export interface GenerateImageData {
  prompt: string;
  name: string;
  style?: Style;
}

const OPEN_AI_GENERATE_ENDPOINT = 'https://api.openai.com/v1/images/generations' as const;

export const generateImage = async (
  apiKeyId: string,
  { prompt, name, style }: GenerateImageData,
) => {
  const response = await fetch(OPEN_AI_GENERATE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      style,
    }),
  });

  const { data } = (await response.json()) as GenerateImageRes;

  const url = data[0].url;
  const id = randomUUID();

  const imageResponse = await fetch(url);
  const buffer = await imageResponse.buffer();
  const path = `/${apiKeyId}/${id}.png`;

  await dbx.filesUpload({ path, contents: buffer });
  const link = await dbx.sharingCreateSharedLinkWithSettings({ path });
  const linkUrl = `${link.result.url}&raw=1`;

  const image = await prisma.image.create({ data: { id, apiKeyId, name, url: linkUrl } });

  return image.url;
};
