import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {IVehicleModel} from "../../interfaces/IVehicleModel.ts";
import {IVehicleMake} from "../../interfaces/IVehicleMake.ts";


interface IMake {
    Id: string;
    Name: string;
}

const EditCarPage = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<IVehicleModel | null>(null);
    const [makes, setMakes] = useState<IMake[]>([]);  // Stanje za listu "Makers"
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels/${id}.json`);
                setCar(response.data);
            } catch (error) {
                console.error("Failed to fetch car data.", error);
            }
        };

        fetchCar();
    }, [id]);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCar(prevCar => prevCar ? { ...prevCar, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!car) return;

        try {
            await axios.put(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels/${id}.json`, car);
            navigate('/home');
        } catch (error) {
            console.error("Failed to update car.", error);
        }
    };

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Edit Car</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={car.Name || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Abrv" className="block text-sm font-medium text-gray-700">Abbreviation</label>
                    <input
                        type="text"
                        id="Abrv"
                        name="Abrv"
                        value={car.Abrv || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="MakeId" className="block text-sm font-medium text-gray-700">Make ID</label>
                    <select
                        id="MakeId"
                        name="MakeId"
                        value={car.MakeId || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select a Maker</option>
                        {makes.map(make => (
                            <option key={make.Id} value={make.Id}>
                                {make.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditCarPage;
