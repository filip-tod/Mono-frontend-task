import Table from "../../components/Table.tsx";
import {useNavigate} from "react-router-dom";

export const CarListPage = () => {
  const navigate = useNavigate();

  return (
    <div className={'flex h-full items-center justify-center w-screen'}>
      <Table
        endpoint={"https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json"}
        columnsConfig={[
          { accessorKey: 'Id', header: 'ID' },
          { accessorKey: 'Name', header: 'Name' },
          { accessorKey: 'Abrv', header: 'Abrv' }
        ]}
        onAdd={() => navigate('/cars/new')}
        onEdit={(id) => navigate(`/cars/edit/${id}`)}
      />
    </div>
  );
}