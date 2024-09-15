import { FC } from "react";

interface IButton {
  readonly children: string;
  readonly theme?: "grey";
  readonly disabled?: boolean;
  readonly className?: string;
  readonly onClick?: () => void;
}

export const Button: FC<IButton> = (props) => {
  const { children, theme, disabled = false, className, onClick } = props;

  const baseClasses = "px-4 py-2 rounded-3xl w-full text-base";
  const defaultClasses = "bg-black text-white";
  const themeClasses =
    theme === "grey" ? "bg-gray-500 text-white" : defaultClasses;

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${themeClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
