import { makeObservable, observable, action, runInAction } from 'mobx';
import { ref, get, set, push, query, orderByKey, startAt, limitToFirst } from 'firebase/database';
import { db } from '../services/firebaseConfig.ts';
import { IVehicleMake } from "../interfaces/IVehicleMake.ts";
import { IVehicleModel } from "../interfaces/IVehicleModel.ts";

const VEHICLE_MAKES_PATH = 'https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes';
const VEHICLE_MODELS_PATH = 'https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels';

class VehicleStore {
    vehicleMakes: IVehicleMake[] = [];
    vehicleModels: IVehicleModel[] = [];

    constructor() {
        makeObservable(this, {
            vehicleMakes: observable,
            vehicleModels: observable,
            fetchVehicleMakes: action,
            fetchVehicleModels: action,
            addVehicleMake: action,
            addVehicleModel: action,
        });
    }

    async fetchVehicleMakes(page: number = 1, itemsPerPage: number = 10) {
        try {
            const startAtIndex = (page - 1) * itemsPerPage;
            const vehicleMakesRef = query(ref(db, VEHICLE_MAKES_PATH), orderByKey(), startAt(String(startAtIndex)), limitToFirst(itemsPerPage));
            const snapshot = await get(vehicleMakesRef);

            runInAction(() => {
                this.vehicleMakes = [];
                snapshot.forEach(childSnapshot => {
                    const vehicleMake = {
                        Id: childSnapshot.key!,
                        Name: childSnapshot.val().name,
                        Abrv: childSnapshot.val().abrv,
                    };
                    this.vehicleMakes.push(vehicleMake);
                });
               /* console.log("Fetched vehicle makes:", this.vehicleMakes);*/
            });
        } catch (error) {
            console.error("Error fetching vehicle makes:", error);
        }
    }

    async fetchVehicleModels(page: number = 1, itemsPerPage: number = 10) {
        try {
            const startAtIndex = (page - 1) * itemsPerPage;
            const vehicleModelsRef = query(ref(db, VEHICLE_MODELS_PATH), orderByKey(), startAt(String(startAtIndex)), limitToFirst(itemsPerPage));
            const snapshot = await get(vehicleModelsRef);

            runInAction(() => {
                this.vehicleModels = [];
                snapshot.forEach(childSnapshot => {
                    const vehicleModel = {
                        Id: childSnapshot.key!,
                        MakeId: childSnapshot.val().makeId,
                        Name: childSnapshot.val().name,
                        Abrv: childSnapshot.val().abrv,
                    };
                    this.vehicleModels.push(vehicleModel);
                });
              /*  console.log("Fetched vehicle models:", this.vehicleModels);*/
            });
        } catch (error) {
            console.error("Error fetching vehicle models:", error);
        }
    }

    async addVehicleMake(Name: string, Abrv: string) {
        try {
            const vehicleMakesRef = ref(db, VEHICLE_MAKES_PATH);
            const newMakeRef = push(vehicleMakesRef);
            await set(newMakeRef, { Name, Abrv });

            runInAction(() => {
                this.vehicleMakes.push({
                    Id: newMakeRef.key!,
                    Name,
                    Abrv,
                });
              /*  console.log("Added vehicle make:", { Id: newMakeRef.key!, Name, Abrv });*/
            });
        } catch (error) {
            console.error("Error adding vehicle make:", error);
        }
    }

    async addVehicleModel(makeId: string, Name: string, Abrv: string) {
        try {
            const vehicleModelsRef = ref(db, VEHICLE_MODELS_PATH);
            const newModelRef = push(vehicleModelsRef);

            const newModelData: IVehicleModel = {
                Id: newModelRef.key!,
                MakeId: makeId,
                Name,
                Abrv
            };

            await set(newModelRef, newModelData);

            runInAction(() => {
                this.vehicleModels.push(newModelData);
              /*  console.log("Added vehicle model:", newModelData);*/
            });
        } catch (error) {
            console.error("Error adding vehicle model:", error);
        }
    }
}

const vehicleStore = new VehicleStore();
export default vehicleStore;
