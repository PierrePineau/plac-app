import { Button } from "@heroui/react";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // Pour les attributs supplémentaires
}

export default function Btn({
  children,
  className = "",
  variant = "primary",
  ...attributes
}: ButtonProps) {
  if (variant === "primary") {
    className += "bg-brand-800 text-white";
  } else if (variant === "light") {
    className +=
      "bg-white text-neutral-800 hover:bg-gray-100 border border-neutral-200";
  }
  // On fait un merge de la classe par défaut avec la classe passée en props
  return (
    <Button
      className={`btn rounded-md hover:opacity-100 ${className} `}
      {...attributes}>
      {children}
    </Button>
  );
}
