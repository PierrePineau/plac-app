"use client";
import { useEffect, useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

// Remplace éventuellement cette SearchBar par ton vrai composant si tu en as un
function SearchBarPlaceholder() {
  return (
    <input
      type="search"
      placeholder="Rechercher"
      className="border border-neutral-300 rounded px-3 py-2 w-full"
    />
  );
}

interface HeaderProps {
  onToggleNav: () => void;
  // Cette fonction est appelée au clic sur l'icône burger (pour ouvrir/fermer la NavBar en mobile)
}

export default function Header({ onToggleNav }: HeaderProps) {
  const [showDesktop, setShowDesktop] = useState(true);

  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      // Si l'utilisateur scrolle au-delà de 50px, on masque la version desktop
      if (window.scrollY > 50) {
        setShowDesktop(false);
      } else {
        setShowDesktop(true);
      }
    };

    console.log("user", user);
    

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header mobile */}
      <div className="sm:hidden flex items-center justify-between px-4 py-2 border-b border-neutral-200 bg-white">
        <button onClick={onToggleNav}>
          <Menu className="w-6 h-6 text-neutral-900" />
        </button>
        <div className="flex items-center gap-6">
          <button>
            <Search className="w-6 h-6 text-black" />
          </button>
          <button className="relative">
            <Bell className="w-6 h-6 text-black" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="relative">
            <img
              className="w-8 h-8 rounded-full"
              src="/asset/img/avatar.svg"
              alt="Avatar"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-brand-500 border-2 border-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Header desktop, affiché uniquement si showDesktop = true */}
      {showDesktop && (
        <div className="hidden sm:flex items-center justify-between px-8 py-4 bg-white border-b border-neutral-200">
          {/* Barre de recherche à gauche */}
          <div className="w-searchBarWidth">
            {/* Remplace ce placeholder par ton vrai composant SearchBar */}
            <SearchBarPlaceholder />
          </div>

          {/* Icône de notification + avatar à droite */}
          <div className="flex items-center gap-6">
            <button className="relative">
              <Bell className="w-6 h-6 text-black" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full"
                src="/asset/img/avatar.svg"
                alt="Avatar"
              />
              <div className="flex flex-col items-start">
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
      )}
    </>
  );
}
