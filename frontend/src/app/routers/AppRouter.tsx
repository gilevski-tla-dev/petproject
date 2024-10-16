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
import { FeedPage } from "../../pages/Feed";
import ProtectedRoute from "../../app/routers/ProtectedRoute";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/feed" />} />

        {/* Защищенные маршруты с использованием Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
