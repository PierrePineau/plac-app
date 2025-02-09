import React, { useEffect, useState } from "react";
import SearchBar from "@/app/components/searchBar";
import Yard from "@/app/components/yard";

const AssociatedYardTabComponentGrid: React.FC<{ yards: Project[] }> = ({
  yards
}) => {
  const [search, setSearch] = useState("");

  const filteredYard = yards.filter((yard) =>
    yard.name?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-6">
      <SearchBar
        label="Rechercher un client"
        placeholder={"Rechercher un chantier"}
        onChange={(e: string) => setSearch(e)}
      />
      <Yard yards={filteredYard} />
    </div>
  );
};

export default AssociatedYardTabComponentGrid;
