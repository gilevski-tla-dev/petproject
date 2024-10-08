import React, { ReactNode } from "react";
import { Header } from "../../widgets/Header/Header";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-[1024px] shadow-layout h-screen self-center mt-header-height">
        {children ? children : <Outlet />}
      </div>
    </div>
  );
};
