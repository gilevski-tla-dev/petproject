import { InfoWidget } from "../../widgets/InfoWidget";
import LoginForm from "../../widgets/LoginForm/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="flex h-full w-full md:w-1/3 order-2 md:order-1">
        <InfoWidget />
      </div>
      <div className="flex min-h-[90vh] md:h-full w-full md:w-2/3 order-1 md:order-2 shadow-3xl z-10">
        <LoginForm />
      </div>
    </div>
  );
};
