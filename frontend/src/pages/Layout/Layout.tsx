import React, { ReactNode } from "react";
import { Header } from "../../widgets/Header";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex max-w-[1024px] w-full shadow-layout h-screen self-center mt-header-height relative overflow-hidden">
        {children ? children : <Outlet />}
      </div>
    </div>
  );
};
