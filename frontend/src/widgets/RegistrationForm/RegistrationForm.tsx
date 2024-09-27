import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegistration } from "../../features/registration/model/registrationModel";
import { Button } from "../../shared/ui/button";
import { InputWithLabel } from "../../shared/ui/input";

export const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading, error } = useRegistration();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData = { name: username, email, password };
    await register(userData);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
        <Link to="/login">Уже есть аккаунт? Войти...</Link>
      </form>
    </div>
  );
};
