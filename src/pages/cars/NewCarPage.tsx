import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {vehicleFormStore} from "../../stores/VehicleFormStore.ts";

export const NewCarPage = observer(() => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (vehicleFormStore.validate()) {
            try {
                await axios.post('https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json', {
                    Name: vehicleFormStore.name,
                    MakeId: vehicleFormStore.makeId,
                    Abrv: vehicleFormStore.abrv,
                });
                vehicleFormStore.resetForm();
                navigate('/home');
            } catch (error) {
                console.error("Failed to add vehicle", error);
            }
        }
    };

    return (
        <>
            <h1>New Car</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={vehicleFormStore.name}
                        onChange={(e) => vehicleFormStore.setName(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {vehicleFormStore.errors.name && (
                        <p className="text-red-500 text-sm">{vehicleFormStore.errors.name}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Make ID</label>
                    <input
                        type="text"
                        value={vehicleFormStore.makeId}
                        onChange={(e) => vehicleFormStore.setMakeId(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {vehicleFormStore.errors.makeId && (
                        <p className="text-red-500 text-sm">{vehicleFormStore.errors.makeId}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Abbreviation</label>
                    <input
                        type="text"
                        value={vehicleFormStore.abrv}
                        onChange={(e) => vehicleFormStore.setAbrv(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {vehicleFormStore.errors.abrv && (
                        <p className="text-red-500 text-sm">{vehicleFormStore.errors.abrv}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </>
    );
});
