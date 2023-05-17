export interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

export interface PaginationResult {
  current: number;
  pageSize: number;
  total: number;
  records: any[];
  pages: number;
  start: number;
}
