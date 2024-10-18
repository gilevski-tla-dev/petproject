import profileIcon from "../../assets/path.svg";
import moonIcon from "../../assets/Moon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ModalHeaderProps {
  isVisible: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ isVisible }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const nav = useNavigate();
  return (
    <div
      className={`w-[212px] h-[150px] bg-white absolute top-[100%] right-0 shadow-xl rounded-b-2xl p-3 gap-1 flex flex-col
        transition-all duration-200 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      <div
        className="flex gap-[10px] hover:bg-black/15 rounded-lg cursor-pointer"
        onClick={() => nav("/profile")}
      >
        <img src={profileIcon} alt="" className="ml-2" />
        <h3>Профиль</h3>
      </div>
      <div className="flex gap-[10px] hover:bg-black/15 rounded-lg cursor-pointer">
        <img src={moonIcon} alt="" className="ml-2" />
        <h3>Тёмная тема</h3>
      </div>
      <div className="flex gap-[10px] hover:bg-black/15 rounded-lg cursor-pointer">
        <img src={settingsIcon} alt="" className="ml-2" />
        <h3>Настройки</h3>
      </div>
      <hr className="self-center w-full mt-1 mb-1 h-1 border-[1px] border-gray-300 " />
      <div
        className="flex gap-[10px] hover:bg-black/15 rounded-lg cursor-pointer"
        onClick={handleLogout}
      >
        <img src={logoutIcon} alt="" className="ml-2" />
        <h3>Выйти</h3>
      </div>
    </div>
  );
};

export default ModalHeader;
