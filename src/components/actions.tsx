import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import Btn from "./btn";
import { EllipsisVertical } from "lucide-react";
import { Key } from 'react';

interface ActionsProps {
    onAction: (key: Key) => void;
    trigger?: React.ReactNode;
    items: Array<{ key: string; label: string, classname?: string, color?: string }>;
}

export default function Actions({
    onAction,
    trigger = <Btn variant="" className="bg-transparent !p-0" isIconOnly><EllipsisVertical /></Btn>,
    items,
  }: ActionsProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        {trigger}
      </DropdownTrigger>
      <DropdownMenu aria-label="Action event example" onAction={onAction}>
        {items.map((item) => (
            <DropdownItem key={item.key} className={item.classname} color={item.color as "secondary" | "default" | "primary" | "success" | "warning" | "danger" | undefined}>
                {item.label}
            </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
