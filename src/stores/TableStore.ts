import {makeObservable, observable } from "mobx";

class TableStore {
  data: any[] = [];
  lastVisible: any | null = null;
  filters: { [key: string]: string } = {};

  constructor() {
    makeObservable(this, {
      data: observable,
      lastVisible: observable,
      filters: observable,
    });
  }

  setData(data: any[]) {
    this.data = data;
  }

  setLastVisible(lastVisible: any | null) {
    this.lastVisible = lastVisible;
  }


  setFilters(filters: { [key: string]: string }) {
    this.filters = filters;
  }
}

export const tableStore = new TableStore();
