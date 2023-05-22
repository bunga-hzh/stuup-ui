export interface Page {
  current: number;
  size: number;
}

export interface PageResult<T> {
  current: number;
  size: number;
  total: number;
  records: T;
  pages: number;
  start: number;
}
