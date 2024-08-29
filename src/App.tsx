import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import authStore from './stores/AuthStore';
import { observer } from 'mobx-react-lite';
import LoginPage from "./pages/login/LoginPage";
import { HomePage } from "./pages/home/HomePage";
import { NewCarPage } from "./pages/cars/NewCarPage";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import EditCarPage from "./pages/cars/EditCarPage.tsx";
import {MakersPage} from "./pages/makers/MakersPage.tsx";
import {AuthProvider} from "./utils/AuthContext.tsx";

const App = observer(() => {
    if (authStore.loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <AuthProvider>
        <NavBar/>
        <Router>
            <Routes>
                <Route path="/login" element=
                    { !authStore.user ? <LoginPage /> : <Navigate to="/home" /> }
                />
                <Route path="/home" element={
                    authStore.user ? <HomePage /> : <Navigate to="/login" />
                } />
                <Route path="/cars/new" element={
                    authStore.user ? <NewCarPage /> : <Navigate to="/login" />
                } />
                <Route path="/cars/edit/:id" element={
                    authStore.user ? <EditCarPage /> : <Navigate to="/login" />
                } />
                <Route path="/cars/makers/" element={
                    authStore.user ? <MakersPage /> : <Navigate to="/login" />
                } />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
            <Footer/>
            </AuthProvider>
        </>
    );
});

export default App;
