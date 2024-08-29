import Table from "../../components/Table.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../utils/AuthContext.tsx";

const columHeaders = [
    { accessorKey: 'Id', header: 'ID' },
    { accessorKey: 'Name', header: 'Name' },
    { accessorKey: 'Abrv', header: 'Abrv' }
];

export const HomePage = () => {
  const { user, token } = useAuth();
    const navigate = useNavigate();

    return(
      <div className={'flex flex-col h-screen w-screen items-center justify-center'}>
        <p className={'mb-2'}>{user?.email}</p>
        <p className={'mb-2'}>
          JWT:
          {token}
        </p>
        <h1 className={'mb-2'}>Car Shop Home Page</h1>

        <Table
          endpoint={"https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json"}
          columnsConfig={columHeaders}
          onAdd={() => navigate('/cars/new')}
          onEdit={(id) => navigate(`/cars/edit/${id}`)}
        />

      </div>
    );
}