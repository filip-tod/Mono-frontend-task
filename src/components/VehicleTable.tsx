import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import vehicleMakesStore from "../stores/VehicleMakesStore";
import { useNavigate } from "react-router-dom";
import vehicleModelsStore from "../stores/VheicleModelStore";
import { IVehicleMake } from "../interfaces/IVehicleMake";
import { IVehicleModel } from "../interfaces/IVehicleModel";

interface VehicleTableProps {
  type: "makes" | "models";
  onEdit?: (id: string) => void;
  onCreate?: () => void;
}

type VehicleMakeColumns = keyof IVehicleMake;
type VehicleModelColumns = keyof IVehicleModel;

const VehicleTable = observer(({ type, onEdit, onCreate }: VehicleTableProps) => {
  const navigate = useNavigate();
  const store = type === "makes" ? vehicleMakesStore : vehicleModelsStore;

  const [sortField, setSortField] = useState<string>("Name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<string>("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const columns: VehicleMakeColumns[] | VehicleModelColumns[] =
    type === "makes" ? ["Id", "Name", "Abrv"] : ["Id", "Name", "MakeId", "Abrv"];

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
    console.log("loading");
  }

  const { vehicleMakes } = vehicleMakesStore;
  const { vehicleModels } = vehicleModelsStore;

  const data: IVehicleMake[] | IVehicleModel[] = type === "makes" ? vehicleMakes : vehicleModels;

  return (
    <div className="mt-5 p-4 relative max-h-screen">
      <h1 className="text-xl font-bold mb-4">
        {type === "makes" ? "Vehicle Makes" : "Vehicle Models"}
      </h1>
      <button
        onClick={onCreate}
        className="mb-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
      >
        Add New {type === "makes" ? "Maker" : "Car Model"}
      </button>
      <input
        type="text"
        placeholder={type === "makes" ? "Filter By Id" : "Filter By Name"}
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="overflow-y-auto max-h-[500px]">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                onClick={() => handleSort(column as string)}
                className="px-6 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
              >
                {column} {sortField === column ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
            ))}
            <th className="px-6 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {data.map((item) => (
            <tr key={item.Id} className="hover:bg-gray-600 bg-gray-800">
              {columns.map((column) => (
                <td key={column} className="px-6 py-4 border-b border-gray-200">
                  {/* TypeScript sada zna koji su validni ključevi */}
                  {item[column as keyof typeof item]}
                </td>
              ))}
              <td className="px-6 py-4 border-b border-gray-200">
                <button onClick={() => handleEdit(item.Id)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button onClick={() => handleDelete(item.Id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
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
          disabled={store.currentPage === 1 || store.loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {store.currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={!store.lastVisible || store.loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default VehicleTable;
