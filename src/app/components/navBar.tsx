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
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div>
      <div className="hidden md:flex w-sideBarWidth md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white p-8">
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

          <div className=" font-satoshi font-bold text-sidebar_title text-neutral-300 ">
            Général
          </div>

          <div className="flex flex-col">
            <div className="space-y-4 pb-12">
              <nav className="flex-1 space-y-2">
                <Link
                  href="/home"
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <House className=" text-black w-6 h-6" />
                  Accueil
                </Link>
                <Link
                  href="/yards"
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Building className=" text-black w-6 h-6" />
                  Mes chantiers
                </Link>
                <Link
                  href="/employee"
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <LinkIcon className=" text-black w-6 h-6" />
                  Mes employés
                </Link>
                <Link
                  href="/clients"
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Users className=" text-black w-6 h-6" />
                  Mes clients
                </Link>
                <Link
                  href="/planning"
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Calendar className=" text-black w-6 h-6" />
                  Planning
                </Link>
              </nav>

              <div className=" font-satoshi font-bold text-sidebar_title text-neutral-300 ">
                Personnel
              </div>

              <nav className="flex-1 space-y-2">
                <Link
                  href="/clients"
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <MessageCircle className=" text-black w-6 h-6" />
                  Messagerie
                </Link>
                <Link
                  href="/clients"
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Settings className=" text-black w-6 h-6" />
                  Paramètres
                </Link>
                <Link
                  href="/clients"
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <LogOut className=" text-black w-6 h-6" />
                  Déconnexion
                </Link>
              </nav>
            </div>

            <div className="flex flex-col p-4 border border-neutral-200 rounded-lg gap-4">
              <div className="flex flex-row justify-center gap-4">
                <Rocket className="text-accent-500 w-6 h-6" />
                <h1 className="text-neutral-950 text-paragraphBold">
                  Passer à la version pro
                </h1>
              </div>
              <p className="text-neutral-500 text-tag pb-6">
                Lorem Ipsum Lorem Ipsum Lorem Ipsum
              </p>

              <button
                type="button"
                className="flex items-center justify-center text-neutral-50 w-full px-4 py-3 text-button rounded-lg bg-accent-500">
                Changer de version
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
