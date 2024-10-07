import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { InputWithLabel } from "../../shared/ui/input";
import { Link } from "../../shared/ui/link";
import { User } from "../../entities/userModel";
import { loginUser } from "../../features/authorization/api/authorizationApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/authorization/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Все поля обязательны к заполнению");
      return;
    }

    const userData: User = { email, password };
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(userData);
      dispatch(login(data.token)); // Сохранить токен в Redux
      navigate("/home"); // Перейти на защищенную страницу
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
        <Button type="submit" disabled={loading}>
          Войти
        </Button>
        {error && <p className="text-red-500">{error}</p>}
        <Link to="/registration">Еще нет аккаунта? Зарегистрироваться</Link>
      </form>
    </div>
  );
};

export default LoginForm;
