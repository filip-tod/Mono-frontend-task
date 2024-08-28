import Table from "../../components/Table.tsx";
import { useState } from "react";
import { MakersModal } from "./components/MakersModal.tsx";
import { useNavigate } from "react-router-dom";

export const MakersPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();

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
        setRefreshKey(prevKey => prevKey + 1);
        navigate('/car/makers');
    };

    return (
        <div className={'flex flex-col justify-center items-center h-80vh w-screen'}>
            <Table
                key={refreshKey}
                endpoint="https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes.json"
                columnsConfig={[
                    { accessorKey: 'Id', header: 'ID' },
                    { accessorKey: 'Name', header: 'Name' },
                    { accessorKey: 'Abrv', header: 'Abrv' }
                ]}
                onAdd={openModalForAdd}
                onEdit={openModalForEdit}
            />
            <MakersModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                itemId={editItemId ?? undefined}
                endpoint={("https://mono-react-app-default-rtdb.firebaseio.com/VehicleMakes")}
                onSuccess={handleSuccess}
            />
        </div>
    );
};
