import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { RegistrationPage } from "../../pages/Registration";
import { LoginPage } from "../../pages/Login";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/registration" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
