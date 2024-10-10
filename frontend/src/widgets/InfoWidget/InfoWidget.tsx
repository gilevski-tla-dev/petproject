import logo from "./logo.png";

export const InfoWidget = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 w-full gap-10">
      <img src={logo} alt="Logo" className="w-4/6 h-2/6 object-cover" />

      <h1 className="text-2xl">Для чего мы?</h1>
      <ul className="text-center">
        <li className="mb-4">
          Статистика у различных социалогических и психологических опросов
        </li>
        <li className="mb-4">
          Статистика у различных социалогических и психологических опросов
        </li>
        <li className="mb-4">
          Статистика у различных социалогических и психологических опросов
        </li>
        <li className="mb-4">
          Статистика у различных социалогических и психологических опросов
        </li>
      </ul>
    </div>
  );
};
