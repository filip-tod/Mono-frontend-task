import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { vehicleFormStore } from "../../stores/VehicleFormStore.ts";
import { IVehicleMake } from "../../interfaces/IVehicleMake.ts";

export const NewCarPage = observer(() => {
    const navigate = useNavigate();
    const [makes, setMakes] = useState<IVehicleMake[]>([]);

    const fetchMakes = async () => {
        try {
            const response = await axios.get<Record<string, IVehicleMake>>('https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json');
            const makesArray: IVehicleMake[] = Object.keys(response.data).map(key => ({
                Id: key,
                Name: response.data[key].Name,
                Abrv: response.data[key].Abrv,
            }));
            setMakes(makesArray);
        } catch (error) {
            console.error("Failed to fetch vehicle makes", error);
        }
    };

    useEffect(() => {
        fetchMakes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (vehicleFormStore.validate()) {
            try {
                await axios.post('https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json', {
                    Name: vehicleFormStore.Name,
                    MakeId: vehicleFormStore.MakeId,
                    Abrv: vehicleFormStore.Abrv,
                });
                vehicleFormStore.resetForm();
                navigate('/home');
            } catch (error) {
                console.error("Failed to add vehicle", error);
            }
        }
    };

    return (
        <div className={'w-screen h-80vh'}>
            <h1>New Car</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={vehicleFormStore.Name}
                        onChange={(e) => vehicleFormStore.setName(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {vehicleFormStore.errors.Name && (
                        <p className="text-red-500 text-sm">{vehicleFormStore.errors.Name}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Make</label>
                    <select
                        value={vehicleFormStore.MakeId}
                        onChange={(e) => vehicleFormStore.setMakeId(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                    >
                        <option value="">Select a Make</option>
                        {makes.map((make) => (
                            <option
                                key={make.Id}
                                value={make.Id}
                            >
                                {make.Name}
                            </option>
                        ))}
                    </select>
                    {vehicleFormStore.errors.MakeId && (
                        <p className="text-red-500 text-sm">{vehicleFormStore.errors.MakeId}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Abbreviation</label>
                    <input
                        type="text"
                        value={vehicleFormStore.Abrv}
                        onChange={(e) => vehicleFormStore.setAbrv(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {vehicleFormStore.errors.Abrv && (
                        <p className="text-red-500 text-sm">{vehicleFormStore.errors.Abrv}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
});
