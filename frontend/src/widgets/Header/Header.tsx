import { useState, useRef, useEffect } from "react";
import arrow from "../../assets/arrow.svg";
import { ModalHeader } from "../ModalHeader";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../features/getProfile/getProfile";
import menuIcon from "../../assets/burgerMenu.svg";

export const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { data: profile } = useQuery(["profile"], getProfile, {});
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s";
  const base64Image = profile?.image
    ? `data:image/jpeg;base64,${profile.image}`
    : defaultImage;
  const toggleMobileMenu = () => {
    setIsMobileMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalVisible(false);
      }
    };
    if (isModalVisible) {
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isModalVisible]);

  return (
    <header className="flex h-header-height bg-slate-600 justify-center z-10 fixed top-0 w-full">
      <div className="flex w-[1024px] relative">
        {/* Burger Menu for mobile screens */}
        <div className="flex md:hidden mr-auto items-center cursor-pointer">
          <img
            src={menuIcon}
            alt="Menu"
            className="w-8 h-8"
            onClick={toggleMobileMenu}
          />
        </div>
        {/* Mobile Menu (hidden by default, toggled by burger icon) */}
        <nav
          className={`absolute top-full left-0 h-screen w-10/12 bg-slate-700 text-white p-4 z-20 transition-transform duration-300 ${
            isMobileMenuVisible
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          }`}
        >
          <ul className="flex flex-col space-y-4">
            <li>
              <a href="/profile">Профиль</a>
            </li>
            <li>
              <a href="/settings">Настройки</a>
            </li>
            <li>
              <a href="/logout">Выйти</a>
            </li>
          </ul>
        </nav>
        {/* Default Profile Header for desktop */}
        <div
          onClick={toggleModal}
          className={`hidden lg:flex modal-trigger ml-auto items-center pl-3 pr-2 cursor-pointer ${
            isModalVisible ? "bg-black/15" : "hover:bg-black/15"
          }`}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-500 mr-2">
            <img
              className="object-cover w-full h-full"
              src={base64Image}
              alt="Profile"
            />
          </div>
          <div>
            <img className="w-8 h-8" src={arrow} alt="Arrow" />
          </div>
        </div>
        <ModalHeader
          isVisible={isModalVisible}
          closeModal={closeModal}
          ref={modalRef}
        />
      </div>
    </header>
  );
};
