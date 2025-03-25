"use client";
import {
  House,
  Building,
  Users,
  Settings,
  LogOut,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import Aside from "@/components/Aside";
import Btn from "@/components/Btn";

interface NavBarProps {
  isNavOpen: boolean;
  onCloseNav: () => void;
}

const items = [
  {
    key: "home",
    icon: House,
    label: "Accueil",
    href: "/admin"
  },
  {
    key: "organisations",
    icon: Building,
    label: "Organisations",
    href: "/admin/organisations"
  },
  {
    key: "users",
    icon: Users,
    label: "Utilisateurs",
    href: "/admin/users"
  },
  {
    key: "plan",
    icon: Rocket,
    label: "Plan",
    href: "/plan"
  },

];

const items2 = [
  {
    key: "settings",
    icon: Settings,
    label: "Paramètres",
    href: "/admin/settings"
  },
  {
    key: "logout",
    icon: LogOut,
    label: "Déconnexion",
    href: "/logout"
  }
];

export default function NavBar({ isNavOpen, onCloseNav }: NavBarProps) {

  const closeOnClickMobile = () => {
    if (isNavOpen && window.innerWidth <= 768) {
      onCloseNav();
    }
  }

  return (
    <Aside
    isOpen={isNavOpen}
    onOpenChange={onCloseNav}
  >
    <div className="flex flex-col gap-4 h-full">
      <span className="text-xs text-sidebar_title text-neutral-400 uppercase">Général</span>
      <nav className="flex-1 space-y-2">
        {
          items.map((item) => (
            <Link key={item.key} href={item.href} onClick={closeOnClickMobile} className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
              <item.icon className=" text-black w-6 h-6" />
              {item.label}
            </Link>
          ))
        }
      </nav>
      <span className="text-xs text-sidebar_title text-neutral-400 uppercase">Personnel</span>
      <nav className="flex-1 space-y-2">
        {
          items2.map((item) => (
            <Link key={item.key} href={item.href} onClick={closeOnClickMobile} className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
              <item.icon className=" text-black w-6 h-6" />
              {item.label}
            </Link>
          ))
        }
      </nav>
    </div>
  </Aside>
  );
}