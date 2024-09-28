import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { Link } from "../../shared/ui/link";
import { InputWithLabel } from "../../shared/ui/input";
import { registerUser } from "../../features/registration/api/registrationApi";
import { User } from "../../features/registration/models/userModel";

export const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setError("Все поля обязательны к заполнению");
      return;
    }

    const userData: User = { username, email, password };
    setLoading(true);
    setError(null);

    try {
      const data = await registerUser(userData);
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ошибка регистрации");
      }
    } finally {
      setLoading(false);
    }
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
