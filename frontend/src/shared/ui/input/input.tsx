interface InputWithLabelProps {
  initialLabel: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  initialLabel,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-gray-700 text-base ml-2 mb-1">
        {initialLabel}:
      </label>
      <input
        className="border border-gray-400 p-2 rounded-xl"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputWithLabel;
