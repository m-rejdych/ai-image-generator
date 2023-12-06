import { z } from 'zod';

const STYLES = {
  VIVID: 'vivid',
  NATURAL: 'natural',
} as const;

export type Style = (typeof STYLES)[keyof typeof STYLES];
type Styles = [Style, Style];

export const generateImageSchema = z.object({
  prompt: z.string().min(5),
  name: z.string().min(1),
  style: z.enum(Object.values(STYLES) as Styles).default(STYLES.VIVID),
});
