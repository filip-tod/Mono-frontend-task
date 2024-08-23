// src/stores/VehicleStore.ts
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

    // Fetch VehicleMakes from Realtime Database
    async fetchVehicleMakes() {
        const vehicleMakesRef = ref(db, 'VehicleMakes');
        const snapshot = await get(vehicleMakesRef);

        runInAction(() => {
            this.vehicleMakes = [];
            snapshot.forEach(childSnapshot => {
                this.vehicleMakes.push({
                    id: childSnapshot.key!,
                    name: childSnapshot.val().name,
                    abrv: childSnapshot.val().abrv,
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
                    id: childSnapshot.key!,
                    makeId: childSnapshot.val().makeId,
                    name: childSnapshot.val().name,
                    abrv: childSnapshot.val().abrv,
                });
            });
        });
    }

    // Add a new VehicleMake to Realtime Database
    async addVehicleMake(name: string, abrv: string) {
        const vehicleMakesRef = ref(db, 'VehicleMakes');
        const newMakeRef = push(vehicleMakesRef);
        await set(newMakeRef, { name, abrv });

        runInAction(() => {
            this.vehicleMakes.push({
                id: newMakeRef.key!,
                name,
                abrv,
            });
        });
    }

    // Add a new VehicleModel to Realtime Database
    async addVehicleModel(makeId: string, name: string, abrv: string) {
        const vehicleModelsRef = ref(db, 'VehicleModels');
        const newModelRef = push(vehicleModelsRef);
        await set(newModelRef, { makeId, name, abrv });

        runInAction(() => {
            this.vehicleModels.push({
                id: newModelRef.key!,
                makeId,
                name,
                abrv,
            });
        });
    }
}

const vehicleStore = new VehicleStore();
export default vehicleStore;
