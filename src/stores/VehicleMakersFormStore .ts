import { makeObservable, observable, action } from 'mobx';

class VehicleMakersFormStore {
    Name = '';
    Abrv = '';
    errors = {
        Name: '',
        Abrv: ''
    };

    constructor() {
        makeObservable(this, {
            Name: observable,
            Abrv: observable,
            errors: observable,
            setName: action,
            setAbrv: action,
            validate: action,
            resetForm: action,
            setError: action,
        });
    }

    setName(value: string) {
        this.Name = value;
        this.errors.Name = value ? '' : 'Name is required';
    }

    setAbrv(value: string) {
        this.Abrv = value;
        this.errors.Abrv = value ? '' : 'Abbreviation is required';
    }

    setError(field: keyof typeof this.errors, message: string) {
        this.errors[field] = message;
    }

    validate() {
        this.setName(this.Name);
        this.setAbrv(this.Abrv);
        return !this.errors.Name && !this.errors.Abrv;
    }

    resetForm() {
        this.Name = '';
        this.Abrv = '';
        this.errors = { Name: '', Abrv: '' };
    }
}

export const vehicleMakersFormStore = new VehicleMakersFormStore();
