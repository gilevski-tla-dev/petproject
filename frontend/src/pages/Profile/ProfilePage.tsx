import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../features/getProfile/getProfile";
import { EditModal } from "../../widgets/EditModal";

export const ProfilePage = () => {
  const {
    data: profile,
    error,
    isLoading,
  } = useQuery(["profile"], getProfile, { staleTime: 1000 });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const {
    name = "Неизвестный пользователь",
    email = "Нет почты",
    image = "",
  } = profile || {};

  const base64Image = `data:image/jpeg;base64,${image}`;

  const handleEditClick = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка получения данных профиля</div>;
  }

  return (
    <div className="flex h-full flex-col w-full family-[Poppins]">
      <div className="hidden md:block w-full bg-green-200 h-60"></div>
      <div className="w-full h-96 md:h-60 flex flex-col md:flex-row items-center md:items-start">
        <div className="md:ml-12 ml-0">
          <div className="w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden md:-mt-24 mt-6">
            <img
              className="object-cover w-full h-full"
              src={
                image
                  ? base64Image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
              }
              alt="Profile"
            />
          </div>
          <h1 className="font-extrabold text-[32px] text-h1 text-center md:text-left">
            {name}
          </h1>
          <h2 className="font-extrabold text-sm text-h1/70 text-center md:text-left">
            {email}
          </h2>
        </div>
        <button
          className="md:ml-auto rounded-lg md:rounded-[50px] border border-gray-500 w-4/5 h-8 md:w-[137px] md:h-[48px] font-medium text-sm text-h1 mt-3 md:mt-[47px] md:mr-7"
          onClick={handleEditClick}
        >
          Редактировать
        </button>
      </div>
      {isEditModalVisible && (
        <EditModal
          closeModal={closeEditModal}
          initialName={name}
          initialEmail={email}
        />
      )}
    </div>
  );
};
