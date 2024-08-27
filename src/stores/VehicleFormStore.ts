import { makeObservable, observable, action } from 'mobx';

class VehicleFormStore {
    Name = '';
    MakeId = '';
    Abrv = '';
    errors = {
        Name: '',
        MakeId: '',
        Abrv: ''
    };

    constructor() {
        makeObservable(this, {
            Name: observable,
            MakeId: observable,
            Abrv: observable,
            errors: observable,
            setName: action,
            setMakeId: action,
            setAbrv: action,
            validate: action,
            resetForm: action,
        });
    }

    setName(value: string) {
        this.Name = value;
        this.errors.Name = value ? '' : 'Name is required';
    }

    setMakeId(value: string) {
        this.MakeId = value;
        this.errors.MakeId = value ? '' : 'Make ID is required';
    }

    setAbrv(value: string) {
        this.Abrv = value;
        this.errors.Abrv = value ? '' : 'Abbreviation is required';
    }

    validate() {
        this.setName(this.Name);
        this.setMakeId(this.MakeId);
        this.setAbrv(this.Abrv);
        return !this.errors.Name && !this.errors.MakeId && !this.errors.Abrv;
    }

    resetForm() {
        this.Name = '';
        this.MakeId = '';
        this.Abrv = '';
        this.errors = { Name: '', MakeId: '', Abrv: '' };
    }
}

export const vehicleFormStore = new VehicleFormStore();
