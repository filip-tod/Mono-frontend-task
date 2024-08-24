import VehicleList from "../../components/Table.tsx";

export const HomePage = () => {
    return(

            <div className={'flex flex-col h-screen w-screen items-center justify-center'}>

                <h1 className={'mb-2'}>Car Shop Home Page</h1>

                <VehicleList/>
            </div>
    );
}