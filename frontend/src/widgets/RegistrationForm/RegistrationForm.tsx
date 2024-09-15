import { Button } from "../../shared/ui/button";
import { InputWithLabel } from "../../shared/ui/input";
import { Link } from "../../shared/ui/link";

export const RegistrationForm = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center justify-center w-2/3 h-full gap-8">
        <h1 className="text-5xl">Регистрация</h1>
        <p className="text-sm text-center">
          Регистрируясь, вы соглашаетесь с политикой пользовательского
          соглашения и правилами пользования.
        </p>
        <InputWithLabel initialLabel="Имя пользователя" />
        <InputWithLabel initialLabel="Email" />
        <InputWithLabel initialLabel="Пароль" />
        <Button>Зарегистрироваться</Button>

        <Link to="/login">Уже есть аккаунт? Войти...</Link>
      </div>
    </div>
  );
};
