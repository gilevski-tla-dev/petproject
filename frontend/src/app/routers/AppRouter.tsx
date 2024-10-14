import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { RegistrationPage } from "../../pages/Registration";
import { LoginPage } from "../../pages/Login";
import { Layout } from "../../pages/Layout";
import { ProfilePage } from "../../pages/Profile";
import ProtectedRoute from "../../app/routers/ProtectedRoute";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Защищенные маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Layout />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
