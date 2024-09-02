import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import vehicleMakesStore from "../stores/VehicleMakesStore";
import vehicleModelsStore from "../stores/VheicleModelStore.ts";
import {useNavigate} from "react-router-dom";

interface VehicleTableProps {
  type: "makes" | "models";
  onEdit?: (id: string) => void;
  onCreate?: () => void;
}

const VehicleTable: React.FC<VehicleTableProps> = observer(({ type, onEdit, onCreate }) => {
  const navigate = useNavigate();
  const store = type === "makes" ? vehicleMakesStore : vehicleModelsStore;

  useEffect(() => {
    if (type === "makes") {
      vehicleMakesStore.fetchVehicleMakes();
    } else {
      vehicleModelsStore.fetchVehicleModels();
    }
  }, [type]);

  if (store.loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    } else {
      navigate(`/cars/edit/${id}`);
    }
  };

  const handleDelete = (id: string) => {
    if (type === "makes") {
      vehicleMakesStore.deleteVehicleMake(id);
    } else {
      vehicleModelsStore.deleteVehicleModel(id);
    }
  };

  const handleNextPage = () => {
    if (store.lastVisible) {
      store.nextPage();
    }
  };

  const handlePrevPage = () => {
    if (store.currentPage > 1) {
      store.prevPage();
    }
  };

  const { vehicleMakes } = vehicleMakesStore;
  const { vehicleModels } = vehicleModelsStore;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{type === "makes" ? "Vehicle Makes" : "Vehicle Models"}</h1>
      <button
        onClick={onCreate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add New {type === "makes" ? "Make" : "Model"}
      </button>
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          {type === "models" && (
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Make ID
            </th>
          )}
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        {type === "makes" &&
          vehicleMakes.map((make) => (
            <tr key={make.Id} className="hover:bg-gray-600 bg-gray-800">
              <td className="px-6 py-4 border-b border-gray-200">{make.Id}</td>
              <td className="px-6 py-4 border-b border-gray-200">{make.Name}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <button onClick={() => handleEdit(make.Id)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button onClick={() => handleDelete(make.Id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        {type === "models" &&
          vehicleModels.map((model) => (
            <tr key={model.Id} className="hover:bg-gray-600 bg-gray-800">
              <td className="px-6 py-4 border-b border-gray-200">{model.Id}</td>
              <td className="px-6 py-4 border-b border-gray-200">{model.Name}</td>
              <td className="px-6 py-4 border-b border-gray-200">{model.MakeId}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <button onClick={() => handleEdit(model.Id)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button onClick={() => handleDelete(model.Id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={store.currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {store.currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={!store.lastVisible}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default VehicleTable;