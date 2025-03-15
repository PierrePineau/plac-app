import { Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label?: string;
  options: string[];
  maxWidth?: string;
}

export default function Dropdown({ label, options, maxWidth }: DropdownProps) {
  return (
    <div className="h-full mx-auto">
      {label && (
        <label className="text-paragraphMedium   text-neutral-950">
          {label}
        </label>
      )}
      <Menu>
        <Menu.Button
          className={`${
            maxWidth ?? "min-w-80"
          } w-full max-h-12 h-full rounded-md border border-gray-300 bg-white text-neutral-300`}>
          <ChevronDown className="" />
        </Menu.Button>

        <Menu.Items className="absolute w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {options.map((option, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  onClick={() => console.log(`You selected: ${option}`)}
                  className={`${
                    active ? "bg-gray-100" : "bg-white"
                  } block px-4 py-2 text-sm text-gray-700 w-full text-left`}>
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}
