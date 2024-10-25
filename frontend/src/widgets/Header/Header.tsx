import { useState, useRef, useEffect, useCallback } from "react";
import arrow from "../../assets/arrow.svg";
import { ModalHeader } from "../ModalHeader";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../features/getProfile/getProfile";
import menuIcon from "../../assets/burgerMenu.svg";

export const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { data: profile } = useQuery(["profile"], getProfile, {});

  const toggleModal = useCallback(() => {
    if (isModalVisible) {
      setIsModalAnimating(false);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 130);
    } else {
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalAnimating(true);
      }, 0);
    }
  }, [isModalVisible]);

  const closeModal = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s";

  const base64Image = profile?.image
    ? `data:image/jpeg;base64,${profile.image}`
    : defaultImage;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
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
  }, [isModalVisible, closeModal]);

  return (
    <header className="flex h-header-height bg-slate-600 justify-center z-10 fixed top-0 w-full">
      <div className="flex w-[1024px] relative">
        <div className="flex md:hidden mr-auto items-center cursor-pointer">
          <img src={menuIcon} alt="Menu" className="w-8 h-8" />
        </div>

        <div
          onClick={toggleModal}
          className={`hidden md:flex modal-trigger ml-auto items-center pl-3 pr-2 cursor-pointer ${
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
            <img className="w-8 h-8 hidden md:block" src={arrow} alt="Arrow" />
          </div>
        </div>

        {isModalVisible && (
          <ModalHeader
            isVisible={isModalAnimating}
            closeModal={closeModal}
            ref={modalRef}
          />
        )}
      </div>
    </header>
  );
};
