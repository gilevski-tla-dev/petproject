import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { InputWithLabel } from "../../shared/ui/input";
import { Link } from "../../shared/ui/link";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setTokens } from "../../store/AuthSlice";
import api from "../../app/ApiClient/axiosInstance";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      return alert("Все поля обязательны к заполнению");
    }

    try {
      const response = await api.post("/sign_in", { email, password });
      const { accessToken, refreshToken } = response.data;

      dispatch(setTokens({ accessToken, refreshToken }));
      navigate("/feed");
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
      alert("Неверная почта или пароль");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-2/3 h-full gap-8"
      >
        <h1 className="text-5xl">Вход</h1>

        <InputWithLabel
          initialLabel="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputWithLabel
          initialLabel="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Войти</Button>
        <Link to="/registration">Еще нет аккаунта? Зарегистрироваться</Link>
      </form>
    </div>
  );
};
