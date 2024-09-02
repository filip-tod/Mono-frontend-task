import {makeObservable, observable } from "mobx";
import {PaginationState, SortingState} from "@tanstack/react-table";

class TableStore {
  data: any[] = [];
  lastVisible: any | null = null;
  sorting: SortingState = [];
  pagination: PaginationState = { pageIndex: 0, pageSize: 10 };
  filters: { [key: string]: string } = {};

  constructor() {
    makeObservable(this, {
      data: observable,
      lastVisible: observable,
      sorting: observable,
      pagination: observable,
      filters: observable,
    });
  }

  setData(data: any[]) {
    this.data = data;
  }

  setLastVisible(lastVisible: any | null) {
    this.lastVisible = lastVisible;
  }


  setSorting(sorting: SortingState) {
    this.sorting = sorting;
  }

  setPagination(pagination: PaginationState) {
    this.pagination = pagination;
  }

  setFilters(filters: { [key: string]: string }) {
    this.filters = filters;
  }
}

export const tableStore = new TableStore();
