// src/stores/DataStore.ts
import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

interface FullPaginationState extends PaginationState {
  total: number;
}

interface SortingState {
  id: string;
  desc: boolean;
}

class DataStore {
  data: any[] = [];
  pagination: FullPaginationState = {
    pageIndex: 0,
    pageSize: 10,
    total: 0,
  };
  sorting: SortingState[] = [];
  loading: boolean = false;

  constructor() {
    makeObservable(this, {
      data: observable,
      pagination: observable,
      sorting: observable,
      loading: observable,
      setPagination: action,
      setSorting: action,
      setData: action,
      setLoading: action,
      fetchData: action,
    });
  }

  setPagination(pagination: PaginationState | ((prev: PaginationState) => PaginationState)) {
    const newPagination = typeof pagination === 'function' ? pagination(this.pagination) : pagination;
    this.pagination = {
      ...this.pagination,
      ...newPagination,
    };
  }

  setSorting(sorting: SortingState[] | ((prev: SortingState[]) => SortingState[])) {
    if (typeof sorting === 'function') {
      this.sorting = sorting(this.sorting);
    } else {
      this.sorting = sorting;
    }
  }

  setData(data: any[]) {
    this.data = data;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  async fetchData() {
    this.setLoading(true);
    try {
      const response = await axios.get(`https://your-api-url.com/data`, {
        params: {
          _page: this.pagination.pageIndex + 1,
          _limit: this.pagination.pageSize,
          _sort: this.sorting.map(s => s.id).join(','),
          _order: this.sorting.map(s => (s.desc ? 'desc' : 'asc')).join(','),
        },
      });
      this.setData(response.data);
      this.setPagination({
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      });
      const total = parseInt(response.headers['x-total-count'], 10);
      this.pagination.total = total;
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      this.setLoading(false);
    }
  }
}

const dataStore = new DataStore();
export default dataStore;
