import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { Link } from "../../shared/ui/link";
import { InputWithLabel } from "../../shared/ui/input";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../features/registration/api/registrationApi";
import { User } from "../../entities/userModel";
import { useNavigate } from "react-router-dom";

export const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation(registerUser, {
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password) {
      return alert("Все поля обязательны к заполнению");
    }

    const userData: User = { name, email, password };
    mutate(userData);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form
        className="flex flex-col items-center justify-center w-2/3 h-full gap-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl">Регистрация</h1>
        <p className="text-sm text-center">
          Регистрируясь, вы соглашаетесь с политикой пользовательского
          соглашения и правилами пользования.
        </p>
        <InputWithLabel
          initialLabel="Имя пользователя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputWithLabel
          initialLabel="Email"
          type="email"
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
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
        {isError && <p className="text-red-500">{(error as Error).message}</p>}
        <Link to="/login">Уже есть аккаунт? Войти...</Link>
      </form>
    </div>
  );
};
