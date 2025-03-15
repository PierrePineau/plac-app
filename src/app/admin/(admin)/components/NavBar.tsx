"use client";
import {
  House,
  Building,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Aside from "@/components/Aside";

export default function NavBar() {
  return (
    <Aside
      isOpen={true}
    >
        <div className="flex flex-col gap-4">
          <span className="text-xs text-sidebar_title text-neutral-400 uppercase">
            Général
          </span>
          <nav className="flex-1 space-y-2">
            <Link
              href="/admin"
              className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
              <House className=" text-black w-6 h-6" />
              Accueil
            </Link>
            <Link
              href="/admin/organisations"
              className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
              <Building className=" text-black w-6 h-6" />
              Organisations
            </Link>
            <Link
              href="/"
              className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
              <Users className=" text-black w-6 h-6" />
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
              <Users className=" text-black w-6 h-6" />
              Utilisateurs
            </Link>
          </nav>
          <span className="text-xs text-sidebar_title text-neutral-400 uppercase">
            Personnel
          </span>
          <nav className="flex-1 space-y-2">
            <Link
              href="/settings"
              className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
              <Settings className=" text-black w-6 h-6" />
              Paramètres
            </Link>
            <Link
              href="/logout"
              className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
              <LogOut className=" text-black w-6 h-6" />
              Déconnexion
            </Link>
          </nav>
        </div>
    </Aside>
  );
}
