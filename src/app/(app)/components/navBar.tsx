"use client";
import {
  House,
  Building,
  Users,
  Calendar,
  Settings,
  LogOut,
  Rocket,
  LinkIcon
} from "lucide-react";
import Link from "next/link";
import Aside from "@/components/aside";

interface NavBarProps {
  isNavOpen: boolean;
  onCloseNav: () => void;
}

export default function NavBar({ isNavOpen, onCloseNav }: NavBarProps) {
  return (
    <>
      {/* NavBar mobile */}
      {isNavOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onCloseNav}
          />
          <div className="relative z-50 bg-white w-64 h-full">
            <Aside>
              <div className="flex flex-col gap-2 p-2">
                <span className="text-xs text-sidebar_title text-neutral-400 uppercase">
                  Général
                </span>
                <nav className="space-y-1">
                  <Link
                    href="/"
                    className="flex items-center gap-2 p-2 text-sm text-gray-900 hover:bg-neutral-100 rounded"
                    onClick={onCloseNav}>
                    <House className="w-5 h-5 text-black" />
                    <span>Accueil</span>
                  </Link>
                  <Link
                    href="/chantiers"
                    className="flex items-center gap-2 p-2 text-sm text-gray-900 hover:bg-neutral-100 rounded"
                    onClick={onCloseNav}>
                    <Building className="w-5 h-5 text-black" />
                    <span>Mes chantiers</span>
                  </Link>
                  <Link
                    href="/employee"
                    className="flex items-center gap-2 p-2 text-sm text-gray-900 hover:bg-neutral-100 rounded"
                    onClick={onCloseNav}>
                    <LinkIcon className="w-5 h-5 text-black" />
                    <span>Mes employés</span>
                  </Link>
                  <Link
                    href="/clients"
                    className="flex items-center gap-2 p-2 text-sm text-gray-900 hover:bg-neutral-100 rounded"
                    onClick={onCloseNav}>
                    <Users className="w-5 h-5 text-black" />
                    <span>Mes clients</span>
                  </Link>
                  <Link
                    href="/planning"
                    className="flex items-center gap-2 p-2 text-sm text-gray-900 hover:bg-neutral-100 rounded"
                    onClick={onCloseNav}>
                    <Calendar className="w-5 h-5 text-black" />
                    <span>Planning</span>
                  </Link>
                </nav>
                <span className="text-xs text-sidebar_title text-neutral-400 uppercase">
                  Personnel
                </span>
                <nav className="space-y-1">
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 p-2 text-sm text-gray-900 hover:bg-neutral-100 rounded"
                    onClick={onCloseNav}>
                    <Settings className="w-5 h-5 text-black" />
                    <span>Paramètres</span>
                  </Link>
                  <Link
                    href="/logout"
                    className="flex items-center gap-2 p-2 text-sm text-gray-900 hover:bg-neutral-100 rounded"
                    onClick={onCloseNav}>
                    <LogOut className="w-5 h-5 text-black" />
                    <span>Déconnexion</span>
                  </Link>
                </nav>
                <div className="flex flex-col p-2 border border-neutral-200 rounded gap-2 mt-2">
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="w-5 h-5 text-accent-500" />
                    <h3 className="text-sm text-neutral-950 font-bold">
                      Passer à la version pro
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum
                  </p>
                  <button
                    type="button"
                    className="flex items-center justify-center text-white w-full px-2 py-2 text-sm rounded bg-accent-500">
                    Changer de version
                  </button>
                </div>
              </div>
            </Aside>
          </div>
        </div>
      )}

      {/* NavBar desktop */}
      <div className="hidden sm:block">
        <Aside>
          <div className="flex flex-col gap-4 p-4">
            <span className="text-xs text-sidebar_title text-neutral-400 uppercase">
              Général
            </span>
            <nav className="flex-1 space-y-2">
              <Link
                href="/"
                className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                <House className="w-6 h-6 text-black" />
                Accueil
              </Link>
              <Link
                href="/chantiers"
                className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                <Building className="w-6 h-6 text-black" />
                Mes chantiers
              </Link>
              <Link
                href="/employee"
                className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                <LinkIcon className="w-6 h-6 text-black" />
                Mes employés
              </Link>
              <Link
                href="/clients"
                className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                <Users className="w-6 h-6 text-black" />
                Mes clients
              </Link>
              <Link
                href="/planning"
                className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                <Calendar className="w-6 h-6 text-black" />
                Planning
              </Link>
            </nav>
            <span className="text-xs text-sidebar_title text-neutral-400 uppercase">
              Personnel
            </span>
            <nav className="flex-1 space-y-2">
              <Link
                href="/settings"
                className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                <Settings className="w-6 h-6 text-black" />
                Paramètres
              </Link>
              <Link
                href="/logout"
                className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                <LogOut className="w-6 h-6 text-black" />
                Déconnexion
              </Link>
            </nav>
            <div className="flex flex-col p-4 border border-neutral-200 rounded-lg gap-4">
              <div className="flex flex-row justify-center gap-4">
                <Rocket className="w-6 h-6 text-accent-500" />
                <h3 className="text-paragraphBold text-neutral-950">
                  Passer à la version pro
                </h3>
              </div>
              <p className="text-tag text-neutral-500 pb-6">
                Lorem Ipsum Lorem Ipsum Lorem Ipsum
              </p>
              <button
                type="button"
                className="flex items-center justify-center text-neutral-50 w-full px-4 py-3 text-button rounded-lg bg-accent-500">
                Changer de version
              </button>
            </div>
          </div>
        </Aside>
      </div>
    </>
  );
}
