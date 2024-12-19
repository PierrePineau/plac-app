import React from "react";

interface ButtonProps {
  text: string;
  icon?: JSX.Element;
  color: string;
  textColor: string;
  onClick: () => void;
}

export default function CustomButton({
  text,
  icon,
  color,
  textColor,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`${color} ${textColor} flex items-center py-2 px-4 border-none rounded-lg cursor-pointer`}
      onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>} {text}
    </button>
  );
}
