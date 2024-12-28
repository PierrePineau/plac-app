import React from "react";

interface ButtonProps {
  text: string;
  icon?: JSX.Element;
  border?: string;
  color: string;
  textColor: string;
  onClick: () => void;
}

export default function CustomButton({
  text,
  icon,
  color,
  textColor,
  border,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`${color} ${textColor} flex items-center py-2 px-4 ${
        border ?? "border-none"
      } rounded-lg cursor-pointer`}
      onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>} {text}
    </button>
  );
}
