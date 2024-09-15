import { Button } from "../../shared/ui/button";
import { InputWithLabel } from "../../shared/ui/input";
import { Link } from "../../shared/ui/link";

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center justify-center w-2/3 h-full gap-8">
        <h1 className="text-5xl">Вход</h1>

        <InputWithLabel initialLabel="Email" />
        <InputWithLabel initialLabel="Пароль" />
        <Button>Войти</Button>
        <Link to="/registration">Еще нет аккаунта? Зарегистрироваться</Link>
      </div>
    </div>
  );
};

export default LoginForm;
