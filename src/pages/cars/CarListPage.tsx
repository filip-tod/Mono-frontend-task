import { useNavigate } from "react-router-dom";
import VehicleTable from "../../components/VehicleTable.tsx";

export const CarListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center h-full w-full p-4 overflow-y-auto">
      <div className="w-full md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        <VehicleTable
          type={"models"}
          onCreate={() => navigate('/cars/new')}
        />
      </div>
    </div>
  );
};
