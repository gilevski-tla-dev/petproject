import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../features/getProfile/getProfile";

export const ProfilePage = () => {
  const {
    data: profileData,
    error,
    isLoading,
  } = useQuery(["profile"], getProfile);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка получения данных профиля</div>;
  }

  return (
    <div>
      <h1>Страница профиля</h1>
      <pre>{JSON.stringify(profileData, null, 2)}</pre>
    </div>
  );
};
