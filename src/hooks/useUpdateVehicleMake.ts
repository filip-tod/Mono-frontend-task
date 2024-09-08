import axios from "axios";
import { IVehicleMake } from "../interfaces/IVehicleMake";
import { useState } from "react";

const baseUrl = "https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes";

export const useUpdateVehicleMake = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateVehicleMake = async (id: string, make: IVehicleMake) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${baseUrl}/${id}.json`, make);
    } catch (err) {
      setError("Failed to update vehicle make");
    } finally {
      setLoading(false);
    }
  };

  return { updateVehicleMake, loading, error };
};