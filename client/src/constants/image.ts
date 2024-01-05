export const IMAGE_STYLES = [
  {
    value: 'vivid',
    label: 'Vivid style',
  },
  {
    value: 'natural',
    label: 'Natural style',
  },
] as const;

export type Style = (typeof IMAGE_STYLES)[number]['value'];
