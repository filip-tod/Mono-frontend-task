import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import authStore from './stores/AuthStore';
import { observer } from 'mobx-react-lite';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { AuthProvider } from './utils/AuthContext';
import LoginPage from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';
import { NewCarPage } from './pages/cars/NewCarPage';
import EditCarPage from './pages/cars/EditCarPage';
import { MakersPage } from './pages/makers/MakersPage';
import { CarListPage } from './pages/cars/CarListPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import routes from "./routes/routes.ts";

const App = observer(() => {
    if (authStore.loading) {
        return (
          <div className="h-screen w-screen flex items-center justify-center">
              <h1 className="text-blue-600">Loading...</h1>
          </div>
        );
    }

    return (
      <Router>
          <AuthProvider>
              <div className="flex justify-between flex-col h-screen w-screen">
                  <NavBar />
                  <Routes>
                      <Route path={routes.login.path} element={!authStore.user ? <LoginPage /> : <Navigate to={routes.home.path} />} />
                      <Route path={routes.home.path} element={authStore.user ? <HomePage /> : <Navigate to={routes.login.path} />} />
                      <Route path={routes.cars.path} element={authStore.user ? <CarListPage /> : <Navigate to={routes.login.path} />} />
                      <Route path={routes.newCar.path} element={authStore.user ? <NewCarPage /> : <Navigate to={routes.login.path} />} />
                      <Route path={routes.editCar.path} element={authStore.user ? <EditCarPage /> : <Navigate to={routes.login.path} />} />
                      <Route path={routes.makers.path} element={authStore.user ? <MakersPage /> : <Navigate to={routes.login.path} />} />
                      <Route path={routes.profile.path} element={authStore.user ? <ProfilePage /> : <Navigate to={routes.login.path} />} />
                      <Route path={routes.notFound.path} element={<Navigate to={routes.login.path} />} />
                  </Routes>
                  <Footer />
              </div>
          </AuthProvider>
      </Router>
    );
});

export default App;
