import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { RegistrationPage } from "../../pages/Registration";
import { LoginPage } from "../../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { HomePage } from "../../pages/Home";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/registration" />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
