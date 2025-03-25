"use client";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import React, { useEffect, useState } from "react";
import Btn from "./Btn";
import { Eye, EyeClosed } from "lucide-react";

interface FieldProps {
  type?: string;
  name: string;
  id?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  unit?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  options?: any[];
  selectedOption?: string;
  [key: string]: any;
}

const Field: React.FC<FieldProps> = ({
  type = "text",
  name = "",
  id = null,
  label = null,
  className = "",
  containerClassName = "",
  endContent = null,
  startContent = null,
  placeholder = " ",
  options = null,
  ...attributes
}) => {
  const [typeInput, setType] = useState(type ?? "text");
  const classInput = [
    "field",
    "placeholder:text-neutral-300",
    "hover:border-neutral-400",
    "focus:ring",
    "focus:ring-2",
    "focus:ring-blue-500",
    "focus:outline",
    "rounded",
    "min-h-10",
    "h-10",
    "pl-4",
    "pr-4",
    "py-2",
    "w-full"
  ];
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setType(isVisible ? "password" : "text");
  };
  useEffect(() => {
    setType(type);
    if (type === "password") {
      setIsVisible(false);
    }
  }, []);
  if (type === "password") {
    endContent = (
      <Btn
        isIconOnly
        variant="none"
        className="btn-icon bg-transparent focus:outline-none !p-0"
        onClick={toggleVisibility}>
        {isVisible ? (
          <Eye className="text-neutral-400" width={18} />
        ) : (
          <EyeClosed className="text-neutral-400" width={18} />
        )}
      </Btn>
    );
  }
  if (endContent) {
    endContent = (
      <div className="absolute right-2 flex items-center h-full text-neutral-300">
        {endContent}
      </div>
    );
    classInput.push("pr-10");
    classInput.splice(classInput.indexOf("pr-4"), 1);
  }
  if (startContent) {
    startContent = (
      <div className="absolute left-2 flex items-center h-full text-neutral-300">
        {startContent}
      </div>
    );
    classInput.push("pl-10");
    classInput.push("data-[has-start-content=true]:ps-10");
    classInput.splice(classInput.indexOf("pl-4"), 1);
  }
  if (type === "select" && options != null) {
    // return (
    //   <div className="field__container">
    //     <label htmlFor="" className="field__label">
    //       {label}
    //     </label>
    //     <select
    //       className={`field font-normal bg-transparent !outline-none focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text text-small field placeholder:text-neutral-300 hover:border-neutral-400 focus:ring-2 focus:ring-blue-500 focus:outline rounded min-h-10 h-10 pl-4 pr-4 py-2 w-full ${className}`}
    //       name={name ?? ""}
    //       id={id ?? ""}
    //       {...attributes}>
    //       {options.map((option) => (
    //         <option key={option.value} value={option.value}>
    //           {option.label}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    // );
    return (
      <Select
        className={`field ${className}`}
        variant="bordered"
        radius={"sm"}
        // startContent={startContent ?? null}
        // endContent={endContent ?? null}
        name={name ?? ""}
        label={label ?? ""}
        placeholder={placeholder ?? " "}
        labelPlacement={"outside"}
        classNames={{
          label: ["field__label", "font-normal"],
          // input: classInput,
          innerWrapper: "bg-transparent",
          listboxWrapper: [
            "p-0",
            "bg-red-500",
            "z-100"
          ],
        }}
        {...attributes}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    );
  } else if (type === "textarea") {
    return (
      <Textarea
        className={`field ${className}`}
        variant="bordered"
        radius={"sm"}
        startContent={startContent ?? null}
        endContent={endContent ?? null}
        type={typeInput}
        name={name ?? ""}
        label={label ?? ""}
        placeholder={placeholder ?? " "}
        labelPlacement={"outside"}
        minRows={6}
        classNames={{
          label: ["field__label", "font-normal"],
          input: classInput,
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "field__wrapper",
            "shadow-sm",
            "p-0",
            "min-h-unset",
            "h-unset",
            `${containerClassName}`
          ]
        }}
        {...attributes}
      />
    );
  } else {
    return (
      <Input
        className={`field ${className}`}
        variant="bordered"
        radius={"sm"}
        startContent={startContent ?? null}
        endContent={endContent ?? null}
        type={typeInput}
        name={name ?? ""}
        label={label ?? ""}
        placeholder={placeholder ?? " "}
        labelPlacement={"outside"}
        classNames={{
          label: ["field__label", "font-normal"],
          input: classInput,
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "field__wrapper",
            "shadow-sm",
            "p-0",
            "min-h-unset",
            "h-unset",
            `${containerClassName}`
          ]
        }}
        {...attributes}
      />
    );
  }
};

export default Field;
