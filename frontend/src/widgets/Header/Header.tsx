import { useState } from "react";
import arrow from "../../assets/arrow.svg";
import { ModalHeader } from "../ModalHeader";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../features/getProfile/getProfile";

export const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: profile } = useQuery(["profile"], getProfile, {});

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s";

  const base64Image = profile?.image
    ? `data:image/jpeg;base64,${profile.image}`
    : defaultImage;

  return (
    <header className="flex h-header-height bg-slate-600 justify-center z-10 fixed top-0 w-full">
      <div className="flex w-[1024px] relative">
        <div
          onClick={toggleModal}
          className={`modal-trigger flex ml-auto items-center pl-3 pr-2 cursor-pointer ${
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

        <ModalHeader isVisible={isModalVisible} />
      </div>
    </header>
  );
};
