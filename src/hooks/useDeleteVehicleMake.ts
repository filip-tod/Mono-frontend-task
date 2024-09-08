import axios from "axios";
import { useState } from "react";

const baseUrl = "https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes";

export const useDeleteVehicleMake = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteVehicleMake = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${baseUrl}/${id}.json`);
    } catch (err) {
      setError("Failed to delete vehicle make");
    } finally {
      setLoading(false);
    }
  };

  return { deleteVehicleMake, loading, error };
};
