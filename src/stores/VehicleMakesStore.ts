import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IVehicleMake } from "../interfaces/IVehicleMake";

class VehicleMakesStore {
  vehicleMakes: IVehicleMake[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 5;
  lastVisible: string | null = null;
  firstVisible: string | null = null;
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
      firstVisible: observable,
    });
  }

  fetchVehicleMakes = async (resetPaging: boolean = false) => {
    this.loading = true;
    try {
      if (resetPaging) {
        this.currentPage = 1;
        this.lastVisible = null;
        this.firstVisible = null; // Resetiraj firstVisible pri resetiranju
      }

      let url = `https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json?orderBy="${this.sortField}"&limitToFirst=${this.pageSize + 1}`;

      if (this.filter) {
        url += `&startAt="${this.filter}"&endAt="${this.filter}\uf8ff"`;
      }

      if (this.lastVisible && this.currentPage > 1) {
        url += `&startAt="${this.lastVisible}"`; // Kreći se unaprijed
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

        this.lastVisible = data.length < this.pageSize ? null : data[data.length - 1].Id ?? null;

        this.firstVisible = data.length > 0 ? data[0].Id ?? null : null;
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

  setSort = () => {
    runInAction(() => {
      this.sortField = "Id";
      this.sortOrder = "asc";
      this.lastVisible = null;
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
    } else {
      console.warn("No more pages to load or lastVisible is not set.");
    }
  };

  prevPage = () => {
    if (this.currentPage > 1 && this.firstVisible) {
      this.currentPage -= 1;

      let url = `https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json?orderBy="${this.sortField}"&limitToLast=${this.pageSize + 1}&endAt="${this.firstVisible}"`;

      axios.get(url)
        .then((response) => {
          const dataKeys = Object.keys(response.data);
          const data: IVehicleMake[] = dataKeys.slice(1, this.pageSize + 1).map((key) => ({
            ...response.data[key],
            Id: key,
          }));

          runInAction(() => {
            this.setVehicleMakes(data);
            this.loading = false;

            this.firstVisible = data.length > 0 ? data[0].Id ?? null : null;
            this.lastVisible = data.length < this.pageSize ? null : data[data.length - 1].Id ?? null;
          });
        })
        .catch((error) => {
          console.error("Failed to fetch previous page", error);
          runInAction(() => {
            this.loading = false;
          });
        });
    }
  };
}

const vehicleMakesStore = new VehicleMakesStore();
export default vehicleMakesStore;
