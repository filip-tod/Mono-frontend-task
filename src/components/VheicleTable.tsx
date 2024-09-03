import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import vehicleMakesStore from "../stores/VehicleMakesStore";
import { useNavigate } from "react-router-dom";
import vehicleModelsStore from "../stores/VheicleModelStore.ts";

interface VehicleTableProps {
  type: "makes" | "models";
  onEdit?: (id: string) => void;
  onCreate?: () => void;
}

const VehicleTable: React.FC<VehicleTableProps> = observer(({ type, onEdit, onCreate }) => {
  const navigate = useNavigate();
  const store = type === "makes" ? vehicleMakesStore : vehicleModelsStore;

  const [sortField, setSortField] = useState<string>("Name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<string>("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (type === "makes") {
      vehicleMakesStore.fetchVehicleMakes();
    } else {
      vehicleModelsStore.fetchVehicleModels();
    }
  }, [type]);

  useEffect(() => {
    store.setSort(sortField, sortOrder);
  }, [sortField, sortOrder, store]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (filter.length >= 3 || filter.length === 0) {
        store.setFilter(filter);
      }
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [filter, store]);

  const handleSort = (field: string) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    store.setSort(field, newOrder);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

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

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    store.setPageSize(newSize);
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

  if (store.loading) {
  console.log('ejuj')
  }

  const { vehicleMakes } = vehicleMakesStore;
  const { vehicleModels } = vehicleModelsStore;

  return (
    <div className="mt-5 p-4 relative max-h-screen overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">{type === "makes" ? "Vehicle Makes" : "Vehicle Models"}</h1>
      <button
        onClick={onCreate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add New {type === "makes" ? "Maker" : "Car Model"}
      </button>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
        <tr>
          <th
            onClick={() => handleSort("Id")}
            className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          >
            ID {sortField === "Id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th
            onClick={() => handleSort("Name")}
            className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          >
            Name {sortField === "Name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th
            onClick={() => handleSort("Abrv")}
            className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          >
            Abrv {sortField === "Abrv" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          {type === "models" && (
            <th
              onClick={() => handleSort("MakeId")}
              className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Make ID {sortField === "MakeId" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
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
              <td className="px-6 py-4 border-b border-gray-200">{make.Abrv}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <button onClick={() => handleEdit(make.Id)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button onClick={() => handleDelete(make.Id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        {type === "models" &&
          vehicleModels.map((model ) => (
            <tr key={model.Id} className="hover:bg-gray-600 bg-gray-800">
              <td className="px-6 py-4 border-b border-gray-200">{model.Id}</td>
              <td className="px-6 py-4 border-b border-gray-200">{model.Name}</td>
              <td className="px-6 py-4 border-b border-gray-200">{model.Abrv}</td>
              <td className="px-6 py-4 border-b border-gray-200">{model.MakeId}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <button onClick={() => handleEdit(model.Id)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button onClick={() => handleDelete(model.Id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <select
          value={store.pageSize}
          onChange={handlePageSizeChange}
          className="mt-1 p-2 w-full border rounded"
        >
          <option value={5}>5 records</option>
          <option value={10}>10 records</option>
          <option value={20}>20 records</option>
        </select>
      </div>
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
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default VehicleTable;
