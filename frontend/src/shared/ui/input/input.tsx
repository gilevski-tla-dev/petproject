interface InputWithLabelProps {
  initialLabel: string;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  initialLabel,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-gray-700 text-base ml-2 mb-1">
        {initialLabel}:
      </label>
      <input className="border border-gray-400 p-2 rounded-xl" type="text" />
    </div>
  );
};

export default InputWithLabel;
