import { Search } from "lucide-react";

interface SearchBarProps {
  label?: string;
  placeholder: string;
}

export default function SearchBar({ label, placeholder }: SearchBarProps) {
  return (
    <form className="max-w-md min-w-80 mx-auto h-full rounded-lg">
      {label && (
        <label className="text-paragraphMedium font-satoshi text-neutral-950">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="text-neutral-200" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 ps-10 text-paragraphMedium text-neutral-950 border border-gray-300 rounded-lg bg-white placeholder:text-neutral-200 placeholder:text-paragraphMedium placeholder:font-satoshi"
          placeholder={placeholder}
          required
        />
      </div>
    </form>
  );
}
