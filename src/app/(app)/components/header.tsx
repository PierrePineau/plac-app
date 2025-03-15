"use client";
import { useEffect, useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Btn from "@components/btn";
import { Badge, Button, Dropdown, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import Tabs from "@components/Tabs";
import Notifications from "./Notifications";
import Field from "@components/field";

// Remplace éventuellement cette SearchBar par ton vrai composant si tu en as un
function SearchBarPlaceholder() {
  return (
    <Field
      name="search"
      placeholder="Rechercher"
      startContent={<Search />}
    />
  );
}

interface HeaderProps {
  onToggleNav: () => void;
  // Cette fonction est appelée au clic sur l'icône burger (pour ouvrir/fermer la NavBar en mobile)
}

export default function Header({ onToggleNav }: HeaderProps) {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center justify-between px-4 py-2 sm:px-8 sm:py-4 border-b border-neutral-200 bg-white">
      <Btn
        isIconOnly
        variant="none"
        className="btn-icon bg-transparent focus:outline-none md:hidden"
        onPress={onToggleNav}>
        <Menu className="text-neutral-900" size={24} />
      </Btn>
      {/* Barre de recherche à gauche */}
      <div className="w-searchBarWidth hidden sm:block">
        {/* Remplace ce placeholder par ton vrai composant SearchBar */}
        <SearchBarPlaceholder />
      </div>
      <div className="flex items-center gap-3">
        <div className="block sm:hidden">
          {/* Remplace ce placeholder par ton vrai composant SearchBar */}
          <Btn isIconOnly variant="none" className="bg-transparent btn-icon !p-0">
            <Search size={24} className="text-black" />
          </Btn>
        </div>
        <Popover color="default" offset={16} placement={"bottom-end"} radius="sm">
          <PopoverTrigger>
              <Btn isIconOnly aria-label="more than 99 notifications" variant="none" className="bg-transparent btn-icon !p-0">
                <Badge color="danger" content="" shape="circle">
                  <Bell size={24} className="text-black" />
              </Badge>
            </Btn>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2 flex flex-col gap-2 min-w-48 lg:min-w-96">
              <h3 className="font-medium text-lg md:text-xl">Notifications</h3>
              <Tabs
                tabs={[
                  { label: "Tout", content: <Notifications /> },
                  { label: "Archivé", content: <Notifications /> },
                ]}
                />
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 rounded-full"
            src="/asset/img/avatar.svg"
            alt="Avatar"
          />
          <div className="flex-col items-start hidden sm:flex">
            <p className="text-paragraphBold text-neutral-900">
              {user?.fullname}
            </p>
            <p className="text-tag text-neutral-400">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
