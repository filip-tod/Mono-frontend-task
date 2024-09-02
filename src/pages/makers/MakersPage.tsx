import  { useState } from 'react';
import { MakersModal } from "./components/MakersModal";
import VehicleTable from "../../components/VheicleTable.tsx";

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

    return (
      <div className="flex flex-col justify-center items-center h-80vh w-screen">


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
    );
};
