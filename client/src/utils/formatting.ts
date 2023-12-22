export const decapitalize = (value: string): string => {
  if (!value) return value;
  if (value.length === 1) return value.toLowerCase();

  return `${value.slice(0, 1).toLowerCase()}${value.slice(1)}`;
};
