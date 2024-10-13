import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { InputWithLabel } from "../../shared/ui/input";
import { Link } from "../../shared/ui/link";
import { User } from "../../entities/userModel";
import { loginUser } from "../../features/authorization/api/authorizationApi";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      navigate("/feed");
      localStorage.setItem("accessToken", data.accessToken);

      localStorage.setItem("refreshToken", data.refreshToken);
    },
    onError: () => {
      alert("Неверная почта или пароль");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      return alert("Все поля обязательны к заполнению");
    }

    const userData: User = { email, password };
    mutate(userData);

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
        <Button type="submit" disabled={isLoading}>
          Войти
        </Button>
        <Link to="/registration">Еще нет аккаунта? Зарегистрироваться</Link>
      </form>
    </div>
  );
};
