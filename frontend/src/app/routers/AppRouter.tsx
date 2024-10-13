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

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/registration" />} />

        {/* Защищённые маршруты внутри HomePage */}
        <Route
          path="/feed/*"
          element={
            <Layout>
              <Routes>
                <Route path="profile" element={<ProfilePage />} />
                {/* Можно добавить и другие защищённые маршруты */}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
