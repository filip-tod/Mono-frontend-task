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
                navigate('/cars');
            } catch (error) {
                console.error("Failed to add vehicle", error);
            }
        }
    };

    return (
      <div className="flex flex-col items-center justify-center   p-4">
          <div className="w-full max-w-lg p-6">
              <h1 className="text-xl font-bold mb-4">Create A New Car</h1>
              <h2 className="text-lg mb-2">What do you need to do?</h2>
              <ol className="list-decimal list-inside mb-6">
                  <li>Type In A Car Name</li>
                  <li>Select A Car Maker</li>
                  <li>Select a Abbreviation for that Car</li>
                  <li>Submit the form</li>
              </ol>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label className="block">Name</label>
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

                  <div>
                      <label className="block">Make</label>
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

                  <div>
                      <label className="block">Abbreviation</label>
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
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                  >
                      Submit
                  </button>
              </form>
          </div>
      </div>
    );
});
