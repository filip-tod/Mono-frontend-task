import Table from "../../components/Table.tsx";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();

    return(
            <div className={'flex flex-col h-screen w-screen items-center justify-center'}>

                <h1 className={'mb-2'}>Car Shop Home Page</h1>

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