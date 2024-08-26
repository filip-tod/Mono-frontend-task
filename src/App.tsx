import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import authStore from './stores/AuthStore';
import { observer } from 'mobx-react-lite';
import LoginPage from "./pages/login/LoginPage";
import { HomePage } from "./pages/home/HomePage";
import { NewCarPage } from "./pages/cars/NewCarPage";
import { EditCarPage } from "./pages/cars/EditCarPage";

const App = observer(() => {
    if (authStore.loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={
                    authStore.user ? <HomePage /> : <Navigate to="/login" />
                } />
                <Route path="/cars/new" element={
                    authStore.user ? <NewCarPage /> : <Navigate to="/login" />
                } />
                <Route path="/cars/edit/:id" element={
                    authStore.user ? <EditCarPage /> : <Navigate to="/login" />
                } />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
});

export default App;
