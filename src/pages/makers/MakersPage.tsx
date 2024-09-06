import {useEffect, useState} from 'react';
import { MakersModal } from "./components/MakersModal";
import VehicleTable from "../../components/VehicleTable.tsx";
import vehicleMakesStore from "../../stores/VehicleMakesStore.ts";

export const MakersPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItemId, setEditItemId] = useState<string | null>(null);

    const openModalForAdd = () => {
        setEditItemId(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (id: string) => {
        setEditItemId(id);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
    };

  useEffect(() => {
    vehicleMakesStore.fetchVehicleMakes();
  }, []);

    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-center h-full w-full p-4 overflow-y-auto">
          <div className="w-full md:max-w-screen-md lg:max-w-screen-lg mx-auto">


        <VehicleTable
          type={'makes'}
          onEdit={openModalForEdit}
          onCreate={openModalForAdd}
        />

          <MakersModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            itemId={editItemId ?? undefined}
            endpoint="https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes"
            onSuccess={handleSuccess}
          />
      </div>
      </div>
    );
};
