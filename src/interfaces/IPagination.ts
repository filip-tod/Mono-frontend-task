export interface Pagination {
  pageIndex: number;
  pageSize: number;
  total: number;
}

export interface Sorting {
  id: string;
  desc?: boolean;
}

export interface Filter {
  [key: string]: string | number | boolean;
}
