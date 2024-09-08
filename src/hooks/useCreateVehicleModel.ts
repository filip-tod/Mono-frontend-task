import { useState } from "react";
import axios from "axios";

export const useCreateVehicleModel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createVehicleModel = async (vehicleModel: { Name: string; MakeId: string; Abrv: string }) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json", vehicleModel);
    } catch (err) {
      setError("Failed to create vehicle model");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { createVehicleModel, loading, error };
};
