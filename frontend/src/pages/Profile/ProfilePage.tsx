import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../features/getProfile/getProfile";

export const ProfilePage = () => {
  const {
    data: profile,
    error,
    isLoading,
  } = useQuery(["profile"], getProfile, {
    staleTime: 1000,
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка получения данных профиля</div>;
  }

  const {
    name = "Неизвестный пользователь",
    email = "Нет почты",
    image = "",
  } = profile || {};

  const base64Image = `data:image/jpeg;base64,${image}`;

  return (
    <div className="flex h-full flex-col w-full family-[Poppins]">
      <div className="w-full bg-green-200 h-60"></div>
      <div className="w-full h-60 flex">
        <div className="ml-12">
          <div className="w-52 h-52 rounded-full overflow-hidden -mt-24">
            <img
              className="object-cover"
              src={
                image
                  ? base64Image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
              }
              alt="Profile"
            />
          </div>
          <h1 className="font-extrabold text-[32px] text-h1">{name}</h1>
          <h2 className="font-extrabold text-sm text-h1/70">{email}</h2>
        </div>
        <button className="ml-auto rounded-[50px] border border-gray-500 w-[137px] h-[48px] font-medium text-sm text-h1 mt-[47px] mr-7">
          Редактировать
        </button>
      </div>
    </div>
  );
};
