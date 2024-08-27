import VehicleList from "../../components/Table.tsx";

export const MakersPage = () =>{
    return(
        <div className={'h-80vh w-screen'}>
            <h1>Makers Page</h1>
            <p> updjetati citavu Table komponentu da prima propove, jedna ideja mi je da vozila za new i edit idu na
                posebne stranice</p>
            <p> a da ova stranica kada stisnem edit i new da mi se otvori modal </p>
            <p>e sad treba razmisliti kako to napraviti a da ga ne zakompliciram jer imam hrpu ideja kak ovo zakomplicirat al radilo bi</p>
            <VehicleList/>
        </div>
    );
}