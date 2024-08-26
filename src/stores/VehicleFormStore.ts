import { makeObservable, observable, action } from 'mobx';

class VehicleFormStore {
    name = '';
    makeId = '';
    abrv = '';
    errors = {
        name: '',
        makeId: '',
        abrv: ''
    };

    constructor() {
        makeObservable(this, {
            name: observable,
            makeId: observable,
            abrv: observable,
            errors: observable,
            setName: action,
            setMakeId: action,
            setAbrv: action,
            validate: action,
            resetForm: action,
        });
    }

    setName(value: string) {
        this.name = value;
        this.errors.name = value ? '' : 'Name is required';
    }

    setMakeId(value: string) {
        this.makeId = value;
        this.errors.makeId = value ? '' : 'Make ID is required';
    }

    setAbrv(value: string) {
        this.abrv = value;
        this.errors.abrv = value ? '' : 'Abbreviation is required';
    }

    validate() {
        this.setName(this.name);
        this.setMakeId(this.makeId);
        this.setAbrv(this.abrv);
        return !this.errors.name && !this.errors.makeId && !this.errors.abrv;
    }

    resetForm() {
        this.name = '';
        this.makeId = '';
        this.abrv = '';
        this.errors = { name: '', makeId: '', abrv: '' };
    }
}

export const vehicleFormStore = new VehicleFormStore();
