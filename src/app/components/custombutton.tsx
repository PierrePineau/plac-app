import React from "react";

interface ButtonProps {
  text: string;
  icon?: JSX.Element;
  border?: string;
  color: string;
  textColor: string;
  padding?: string;
  hover: string;
  onClick: () => void;
}

export default function CustomButton({
  text,
  icon,
  color,
  textColor,
  padding,
  border,
  hover,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`${color} ${textColor} flex justify-center items-center ${hover} ${
        padding ?? "py-2 px-4"
      } ${border ?? "border-none"} rounded-lg cursor-pointer`}
      onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>} {text}
    </button>
  );
}
