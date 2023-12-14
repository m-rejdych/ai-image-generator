const SORT_TYPES = ['asc', 'desc'] as const;

export type SortType = typeof SORT_TYPES[number];

export const getSortByCreatedAtType = (sortType?: SortType): SortType => {
  if (!sortType) return 'asc';

  const parsedSortType = sortType.toLowerCase() as SortType;
  return SORT_TYPES.includes(parsedSortType) ? parsedSortType : 'asc';
};
