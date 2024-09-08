import { useState, useEffect } from "react";
import axios from "axios";
import { IVehicleModel } from "../interfaces/IVehicleModel";

export const useFetchVehicleModel = (id: string | undefined) => {
  const [vehicleModel, setVehicleModel] = useState<IVehicleModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicleModel = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<IVehicleModel>(
        `https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels/${id}.json`
      );
      setVehicleModel(response.data);
    } catch (err) {
      setError("Failed to fetch vehicle model data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleModel();
  }, [id]);

  return { vehicleModel, loading, error, setVehicleModel };
};
