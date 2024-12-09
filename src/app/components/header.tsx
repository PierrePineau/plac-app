import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <div className="justify-start bg-white px-8 py-5">
      <div className="flex flex-row justify-between items-center">
        <form className="w-searchBarWidth">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-neutral-400">
              <Search />
            </div>
            <input
              type="search"
              id="default-search"
              className="rounded-md w-full px-3 py-2 ps-10 border placeholder:text-paragraphMedium text-neutral-950 placeholder:text-neutral-400"
              placeholder="Rechercher"
              required
            />
          </div>
        </form>
        <div className="flex flex-row justify-center items-center gap-3">
          <Bell className="text-black" />
          <img
            className="w-auto h-8"
            src="/asset/img/avatar.svg"
            alt="Logo Plac"
          />
          <div className="flex flex-col items-start">
            <p className="text-paragraphBold text-neutral-900">Jean Martin</p>
            <p className="text-tag text-neutral-400">jeanmartin@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
