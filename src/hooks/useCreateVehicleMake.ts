import axios from "axios";
import { IVehicleMake } from "../interfaces/IVehicleMake";
import { useState } from "react";

const baseUrl = "https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json";

export const useCreateVehicleMake = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVehicleMake = async (make: IVehicleMake) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(baseUrl, make);
    } catch (err) {
      setError("Failed to create vehicle make");
    } finally {
      setLoading(false);
    }
  };

  return { createVehicleMake, loading, error };
};
