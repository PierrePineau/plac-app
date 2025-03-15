import Field from "@/components/Field";
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
      <Field 
          type="search"
          name="search"
          placeholder={placeholder}
          value=""
          icon={<Search />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </form>
  );
}
