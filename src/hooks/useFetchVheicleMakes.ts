import { useState, useEffect } from "react";
import axios from "axios";
import { IVehicleMake } from "../interfaces/IVehicleMake";

export const useFetchVehicleMakes = () => {
  const [makes, setMakes] = useState<IVehicleMake[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMakes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Record<string, IVehicleMake>>(
        "https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json"
      );
      const makesArray: IVehicleMake[] = Object.keys(response.data).map((key) => ({
        Id: key,
        Name: response.data[key].Name,
        Abrv: response.data[key].Abrv,
      }));
      setMakes(makesArray);
    } catch (err) {
      setError("Failed to fetch vehicle makes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMakes();
  }, []);

  return { makes, loading, error };
};
