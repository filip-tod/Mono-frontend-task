import { observer } from "mobx-react-lite";
import { IModalProps } from "../../../interfaces/IModalProps.ts";
import { useEffect } from "react";
import { vehicleMakersFormStore } from "../../../stores/VehicleMakersFormStore .ts";
import { useCreateVehicleMake } from "../../../hooks/useCreateVehicleMake";
import { useUpdateVehicleMake } from "../../../hooks/useUpdateVehicleMake";
import axios from "axios";

export const MakersModal = observer(({ isOpen, onClose, itemId, endpoint, onSuccess }: IModalProps) => {

  const { createVehicleMake, loading: createLoading } = useCreateVehicleMake();
  const { updateVehicleMake, loading: updateLoading } = useUpdateVehicleMake();

  const fetchData = async () => {
    if (itemId) {
      try {
        const response = await axios.get(`${endpoint}/${itemId}.json`);
        vehicleMakersFormStore.setName(response.data.Name);
        vehicleMakersFormStore.setAbrv(response.data.Abrv);
      } catch (error) {
        vehicleMakersFormStore.resetForm();
        console.error("Error fetching data", error);
      }
    } else {
      vehicleMakersFormStore.resetForm();
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemId, endpoint]);

  const handleSubmit = async () => {
    if (vehicleMakersFormStore.validate()) {
      try {
        if (itemId) {
          await updateVehicleMake(itemId, {
            Name: vehicleMakersFormStore.Name,
            Abrv: vehicleMakersFormStore.Abrv,
          });
        } else {
          await createVehicleMake({
            Name: vehicleMakersFormStore.Name,
            Abrv: vehicleMakersFormStore.Abrv,
          });
        }
        onSuccess();
        onClose();
      } catch (error) {
        vehicleMakersFormStore.setError("Name", "Error saving data");
        console.error(error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{itemId ? 'Edit' : 'Add'} Vehicle Maker</h2>
        {vehicleMakersFormStore.errors.Name && <p className="text-red-500 mb-4">{vehicleMakersFormStore.errors.Name}</p>}
        <input
          type="text"
          placeholder="Name"
          value={vehicleMakersFormStore.Name}
          onChange={(e) => vehicleMakersFormStore.setName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Abrv"
          value={vehicleMakersFormStore.Abrv}
          onChange={(e) => vehicleMakersFormStore.setAbrv(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={createLoading || updateLoading}
          >
            {itemId ? 'Update' : 'Create'}
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});
