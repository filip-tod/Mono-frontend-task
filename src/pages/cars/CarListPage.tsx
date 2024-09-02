import VheicleTable from "../../components/VheicleTable.tsx";
import {useNavigate} from "react-router-dom";

export const CarListPage = () => {
  const navigate = useNavigate();

  return (
    <div className={'flex h-full items-center justify-center w-screen'}>

      <VheicleTable
        type={"models"}
        onCreate={() => navigate('/cars/new')}
      />
    </div>
  );
}