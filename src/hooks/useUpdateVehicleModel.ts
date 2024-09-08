import { useState } from "react";
import axios from "axios";
import { IVehicleModel } from "../interfaces/IVehicleModel";

export const useUpdateVehicleModel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateVehicleModel = async (id: string, car: IVehicleModel) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels/${id}.json`,
        car
      );
    } catch (err) {
      setError("Failed to update car.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateVehicleModel, loading, error };
};
