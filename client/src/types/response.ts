export interface ResultResBody<T extends Record<string, unknown> | null> {
  result: 'success' | 'failure';
  data: T;
}
