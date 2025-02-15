"use client";
import {
  ArrowLeftFromLine,
  House,
  Building,
  Users,
  Calendar,
  Newspaper,
  MessageCircle,
  Settings,
  LogOut,
  Rocket,
  LinkIcon
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/user/useAuthStore";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div>
      <div className="hidden md:flex w-sideBarWidth md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white p-8 gap-4">
          <div className="flex flex-row justify-between items-center flex-shrink-0 pb-10">
            <img
              className="w-auto h-8"
              src="/asset/img/logo.svg"
              alt="Logo Plac"
            />
            <ArrowLeftFromLine
              className=" text-black w-6 h-6"
              onClick={handleLogout}
            />
          </div>

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
                href="#"
                onClick={handleLogout}
                className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                <LogOut className=" text-black w-6 h-6" />
                Déconnexion
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
