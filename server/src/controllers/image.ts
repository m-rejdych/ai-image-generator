import fetch from 'node-fetch';

interface GenerateImageResponse {
  created: number;
  data: [{ url: string }];
}

export const generateImage = async (prompt: string) => {
  const response = await fetch(process.env.GENERATE_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
    }),
  });

  const { data } = await response.json() as GenerateImageResponse ;

  const url = data[0].url;

  return url;
};
