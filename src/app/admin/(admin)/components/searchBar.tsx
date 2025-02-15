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
    <form className="max-w-md min-w-80 mx-auto h-full rounded-lg ml-0">
      {label && (
        <label className="text-paragraphMedium   text-neutral-950">
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
          className="block w-full p-3 ps-10 text-paragraphMedium text-neutral-950 border border-gray-300 rounded-lg bg-white placeholder:text-neutral-200 placeholder:text-paragraphMedium placeholder: "
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          required
        />
      </div>
    </form>
  );
}
