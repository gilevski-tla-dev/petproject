interface ModalHeaderProps {
  isVisible: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ isVisible }) => {
  return (
    <div
      className={`w-[212px] h-[150px] bg-white absolute top-[100%] right-0 shadow-xl rounded-b-2xl
        transition-all duration-200 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    ></div>
  );
};

export default ModalHeader;
