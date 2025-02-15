"use client";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <div className="justify-start bg-white px-8 py-5">
      <div className="flex flex-row justify-between items-center">
        <div className="w-searchBarWidth">
          <SearchBar
            placeholder="Rechercher"
            onChange={function (query: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <div className="flex flex-col items-start">
            <p className="text-paragraphBold text-neutral-900">Administrateur</p>
            <p className="text-tag text-neutral-400">exemple@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
