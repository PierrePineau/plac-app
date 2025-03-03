"use client";
import { Search } from "lucide-react";

interface SearchBarProps {
  label?: string;
  placeholder: string;
  onChange: (query: string) => void;
}

export default function SearchBar({
  label,
  placeholder,
  onChange
}: SearchBarProps) {
  return (
    <>
      <form className="sm:hidden max-w-xs mx-auto h-full rounded-lg ml-0">
        {label && <label className="text-sm text-neutral-950">{label}</label>}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
            <Search className="w-4 h-4 text-neutral-200" />
          </div>
          <input
            type="search"
            id="default-search-mobile"
            className="block w-full p-2 ps-8 text-sm text-neutral-950 border border-gray-300 rounded-lg bg-white placeholder:text-neutral-200"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            required
          />
        </div>
      </form>
      <form className="hidden sm:block max-w-md mx-auto h-full rounded-lg ml-0">
        {label && (
          <label className="text-paragraphMedium text-neutral-950">
            {label}
          </label>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="text-neutral-200" />
          </div>
          <input
            type="search"
            id="default-search-web"
            className="block w-full p-3 ps-10 text-paragraphMedium text-neutral-950 border border-gray-300 rounded-lg bg-white placeholder:text-neutral-200 placeholder:text-paragraphMedium"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            required
          />
        </div>
      </form>
    </>
  );
}
