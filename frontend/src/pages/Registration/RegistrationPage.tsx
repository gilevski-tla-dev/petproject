import { InfoWidget } from "../../widgets/InfoWidget";
import { RegistrationForm } from "../../widgets/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="flex min-h-[90vh] w-full md:h-full md:w-2/3">
        <RegistrationForm />
      </div>
      <div className="flex h-full w-full md:w-1/3">
        <InfoWidget />
      </div>
    </div>
  );
};

export default RegistrationPage;
