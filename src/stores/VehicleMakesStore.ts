import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IVehicleMake } from "../interfaces/IVehicleMake";

class VehicleMakesStore {
  vehicleMakes: IVehicleMake[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 5;
  lastVisible: string | null = null;
  sortField = "Name";
  sortOrder: "asc" | "desc" = "asc";
  filter = "";

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      loading: observable,
      currentPage: observable,
      lastVisible: observable,
      pageSize: observable,
      sortField: observable,
      sortOrder: observable,
      filter: observable,
      fetchVehicleMakes: action,
      setVehicleMakes: action,
      createVehicleMake: action,
      updateVehicleMake: action,
      deleteVehicleMake: action,
      nextPage: action,
      prevPage: action,
      setPageSize: action,
      setSort: action,
      setFilter: action,
    });
  }

  fetchVehicleMakes = async (resetPaging: boolean = false) => {
    this.loading = true;
    try {
      if (resetPaging) {
        this.currentPage = 1;
        this.lastVisible = null;
      }

      let url = `https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json?orderBy="Id"&limitToFirst=${this.pageSize + 1}`;

      if (this.filter) {
        url += `&startAt="${this.filter}"&endAt="${this.filter}\uf8ff"`;
      }

      if (this.lastVisible) {
        url += `&startAt="${this.lastVisible}"`;
      }

      const response = await axios.get(url);
      const dataKeys = Object.keys(response.data);

      const data: IVehicleMake[] = dataKeys.slice(0, this.pageSize).map((key) => ({
        ...response.data[key],
        Id: key,
      }));

      runInAction(() => {
        this.setVehicleMakes(data);
        this.loading = false;

        if (data.length < this.pageSize) {
          this.lastVisible = null;
        } else {
          const lastItemId = data[data.length - 1].Id;
          this.lastVisible = lastItemId ? lastItemId : null;
        }
      });
    } catch (error) {
      console.error("Failed to fetch vehicle makes", error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  setVehicleMakes = (makes: IVehicleMake[]) => {
    this.vehicleMakes = makes;
  };

  setPageSize = (size: number) => {
    this.pageSize = size;
    this.currentPage = 1;
    this.lastVisible = null;
    this.fetchVehicleMakes();
  };

  setFilter = (filter: string) => {
    runInAction(() => {
      this.filter = filter;
    });
    this.fetchVehicleMakes(true);
  };

  setSort = (field: string, order: "asc" | "desc") => {
    runInAction(() => {
      this.sortField = field;
      this.sortOrder = order;
    });
    this.fetchVehicleMakes(true);
  };

  createVehicleMake = async (make: IVehicleMake) => {
    try {
      await axios.post(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json`, make);
      this.fetchVehicleMakes();
    } catch (error) {
      console.error("Failed to create vehicle make.", error);
    }
  };

  updateVehicleMake = async (id: string, make: IVehicleMake) => {
    try {
      await axios.put(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes/${id}.json`, make);
      this.fetchVehicleMakes();
    } catch (error) {
      console.error("Failed to update vehicle make.", error);
    }
  };

  deleteVehicleMake = async (id: string) => {
    try {
      await axios.delete(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes/${id}.json`);
      this.fetchVehicleMakes();
    } catch (error) {
      console.error("Failed to delete vehicle make.", error);
    }
  };

  nextPage = () => {
    if (this.lastVisible) {
      this.currentPage += 1;
      this.fetchVehicleMakes();
    }
  };

  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.lastVisible = null;
      this.fetchVehicleMakes();
    }
  };
}

const vehicleMakesStore = new VehicleMakesStore();
export default vehicleMakesStore;
