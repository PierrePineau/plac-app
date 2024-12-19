import {
  ArrowLeftFromLine,
  House,
  Building,
  Link,
  Users,
  Calendar,
  Newspaper,
  MessageCircle,
  Settings,
  LogOut,
  Rocket
} from "lucide-react";

export default function NavBar() {
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
            <ArrowLeftFromLine className=" text-black w-6 h-6" />
          </div>

          <div className=" font-satoshi font-bold text-sidebar_title text-neutral-300 ">
            Général
          </div>

          <div className="flex flex-col">
            <div className="space-y-4 pb-12">
              <nav className="flex-1 space-y-2">
                <a
                  href="home"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <House className=" text-black w-6 h-6" />
                  Accueil
                </a>
                <a
                  href="chantiers"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Building className=" text-black w-6 h-6" />
                  Mes chantiers
                </a>
                <a
                  href="#"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Link className=" text-black w-6 h-6" />
                  Mon entreprise
                </a>
                <a
                  href="#"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Users className=" text-black w-6 h-6" />
                  Mes clients
                </a>
                <a
                  href="#"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Calendar className=" text-black w-6 h-6" />
                  Planning
                </a>
                <a
                  href="#"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Newspaper className=" text-black w-6 h-6" />
                  Fiche de fin de journée
                </a>
              </nav>

              <div className=" font-satoshi font-bold text-sidebar_title text-neutral-300 ">
                Personnel
              </div>

              <nav className="flex-1 space-y-2">
                <a
                  href="#"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <MessageCircle className=" text-black w-6 h-6" />
                  Messagerie
                </a>
                <a
                  href="#"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <Settings className=" text-black w-6 h-6" />
                  Paramètres
                </a>
                <a
                  href="#"
                  title=""
                  className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
                  <LogOut className=" text-black w-6 h-6" />
                  Déconnexion
                </a>
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
