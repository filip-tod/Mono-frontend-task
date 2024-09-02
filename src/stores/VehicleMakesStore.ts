import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { IVehicleMake } from "../interfaces/IVehicleMake";

class VehicleMakesStore {
  vehicleMakes: IVehicleMake[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 5;
  lastVisible: string | null = null;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      loading: observable,
      currentPage: observable,
      lastVisible: observable,
      fetchVehicleMakes: action,
      setVehicleMakes: action,
      createVehicleMake: action,
      updateVehicleMake: action,
      deleteVehicleMake: action,
      nextPage: action,
      prevPage: action,
    });
  }

  fetchVehicleMakes = async () => {
    this.loading = true;
    try {
      let url = `https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json?orderBy="$key"&limitToFirst=${this.pageSize + 1}`;
      if (this.lastVisible) {
        url += `&startAt="${this.lastVisible}"`;
      }
      const response = await axios.get(url);
      const dataKeys = Object.keys(response.data);

      // Ako imamo više od pageSize, to znači da postoji još zapisa
      const data: IVehicleMake[] = dataKeys.slice(0, this.pageSize).map((key) => ({
        ...response.data[key],
        Id: key,
      }));

      runInAction(() => {
        this.setVehicleMakes(data);
        this.loading = false;
        this.lastVisible = dataKeys.length > this.pageSize ? dataKeys[this.pageSize] : null; // Postavi lastVisible na zadnji ključ
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
      this.lastVisible = null; // Resetiraj lastVisible
      this.fetchVehicleMakes();
    }
  };
}

const vehicleMakesStore = new VehicleMakesStore();
export default vehicleMakesStore;
