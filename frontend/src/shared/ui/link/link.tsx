import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigateLinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<NavigateLinkProps> = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <a
      onClick={handleClick}
      className="underline text-blue-700 text-center cursor-pointer"
    >
      {children}
    </a>
  );
};
