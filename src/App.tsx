import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import authStore from './stores/AuthStore';
import { observer } from 'mobx-react-lite';
import LoginPage from "./pages/login/LoginPage.tsx";
import {HomePage} from "./pages/home/HomePage.tsx";

const App = observer(() => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={
                    authStore.user ? <HomePage /> : <Navigate to="/login" />
                } />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
});

export default App;