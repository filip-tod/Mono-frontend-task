import { makeObservable, observable, action, runInAction } from 'mobx';
import { ref, get, set, push } from 'firebase/database';
import { db } from '../services/firebaseConfig.ts';
import {IVehicleMake} from "../interfaces/IVehicleMake.ts";
import {IVehicleModel} from "../interfaces/IVehicleModel.ts";

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

    async fetchVehicleMakes() {
        const vehicleMakesRef = ref(db, 'VehicleMakes');
        const snapshot = await get(vehicleMakesRef);

        runInAction(() => {
            this.vehicleMakes = [];
            snapshot.forEach(childSnapshot => {
                this.vehicleMakes.push({
                    Id: childSnapshot.key!,
                    Name: childSnapshot.val().name,
                    Abrv: childSnapshot.val().abrv,
                });
            });
        });
    }

    // Fetch VehicleModels from Realtime Database
    async fetchVehicleModels() {
        const vehicleModelsRef = ref(db, 'VehicleModels');
        const snapshot = await get(vehicleModelsRef);

        runInAction(() => {
            this.vehicleModels = [];
            snapshot.forEach(childSnapshot => {
                this.vehicleModels.push({
                    Id: childSnapshot.key!,
                    MakeId: childSnapshot.val().makeId,
                    Name: childSnapshot.val().name,
                    Abrv: childSnapshot.val().abrv,
                });
            });
        });
    }

    // Add a new VehicleMake to Realtime Database
    async addVehicleMake(Name: string, Abrv: string,) {
        const vehicleMakesRef = ref(db, 'VehicleMakes');
        const newMakeRef = push(vehicleMakesRef);
        await set(newMakeRef, { Name, Abrv });

        runInAction(() => {
            this.vehicleMakes.push({
                Id: newMakeRef.key!,
                Name,
                Abrv,
            });
        });
    }

    // Add a new VehicleModel to Realtime Database
    async addVehicleModel(makeId: string, Name: string, Abrv: string) {
        const vehicleModelsRef = ref(db, 'VehicleModels');
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
        });
    }
}

const vehicleStore = new VehicleStore();
export default vehicleStore;
