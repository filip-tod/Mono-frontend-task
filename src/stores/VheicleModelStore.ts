import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IVehicleModel } from "../interfaces/IVehicleModel";

class VehicleModelsStore {
  vehicleModels: IVehicleModel[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 5;
  lastVisible: string | null = null;
  sortField = "Name";
  filter = "";

  constructor() {
    makeObservable(this, {
      vehicleModels: observable,
      loading: observable,
      currentPage: observable,
      lastVisible: observable,
      pageSize: observable,
      sortField: observable,
      filter: observable,
      fetchVehicleModels: action,
      setVehicleModels: action,
      createVehicleModel: action,
      updateVehicleModel: action,
      deleteVehicleModel: action,
      nextPage: action,
      prevPage: action,
      setPageSize: action,
      setSort: action,
      setFilter: action,
    });
  }

  fetchVehicleModels = async (resetPaging: boolean = false) => {
    this.loading = true;
    try {
      if (resetPaging) {
        this.currentPage = 1;
        this.lastVisible = null;
      }

      let url = `https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json?orderBy="${this.sortField}"&limitToFirst=${this.pageSize + 1}`;

      if (this.filter) {
        url += `&startAt="${this.filter}"&endAt="${this.filter}\uf8ff"`;
      }

      if (this.lastVisible) {
        url += `&startAt="${this.lastVisible}"`;
      }

      const response = await axios.get(url);

      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error("No data returned from the API");
      }

      const dataKeys = Object.keys(response.data);

      const data: IVehicleModel[] = dataKeys.slice(0, this.pageSize).map((key) => ({
        ...response.data[key],
        Id: key,
      }));

      runInAction(() => {
        this.setVehicleModels(data);
        this.loading = false;

        this.lastVisible = data.length < this.pageSize ? null : data[data.length - 1].Id;
      });
    } catch (error) {
      console.error("Failed to fetch vehicle models", error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  setVehicleModels = (models: IVehicleModel[]) => {
    this.vehicleModels = models;
  };

  setPageSize = (size: number) => {
    this.pageSize = size;
    this.currentPage = 1;
    this.lastVisible = null;
    this.fetchVehicleModels();
  };

  setFilter = (filter: string) => {
    runInAction(() => {
      this.filter = filter;
      this.currentPage = 1;
      this.lastVisible = null;
    });
    this.fetchVehicleModels(true);
  };

  setSort = () => {
    runInAction(() => {
      this.sortField = "Name";
      this.currentPage = 1;
      this.lastVisible = null;
    });
    this.fetchVehicleModels(true);
  };

  createVehicleModel = async (model: IVehicleModel) => {
    try {
      await axios.post(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json`, model);
      this.fetchVehicleModels();
    } catch (error) {
      console.error("Failed to create vehicle model.", error);
    }
  };

  updateVehicleModel = async (id: string, model: IVehicleModel) => {
    try {
      await axios.put(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels/${id}.json`, model);
      this.fetchVehicleModels();
    } catch (error) {
      console.error("Failed to update vehicle model.", error);
    }
  };

  deleteVehicleModel = async (id: string) => {
    try {
      await axios.delete(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels/${id}.json`);
      this.fetchVehicleModels();
    } catch (error) {
      console.error("Failed to delete vehicle model.", error);
    }
  };

  nextPage = () => {
    if (this.lastVisible) {
      this.currentPage += 1;
      this.fetchVehicleModels();
    }
  };

  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.fetchVehicleModels();
    }
  };
}

const vehicleModelsStore = new VehicleModelsStore();
export default vehicleModelsStore;