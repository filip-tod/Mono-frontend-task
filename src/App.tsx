import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {HomePage} from "./pages/home/HomePage.tsx";
import {LoginPage} from "./pages/login/LoginPage.tsx";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/"  element={<LoginPage />} />
          <Route path="/Home" element={<HomePage />} />
        </Routes>
      </Router>
  );
}

export default App;
