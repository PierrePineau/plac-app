import React, { useEffect, useState } from "react";
import Yard from "@/components/yard";
import SearchBar from "@/app/(app)/components/searchBar";

const AssociatedYardTabComponentGrid: React.FC<{ yards: Project[] }> = ({
  yards
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <SearchBar
        label="Rechercher un client"
        placeholder={"Rechercher un chantier"}
        onChange={(e: string) => setSearch(e)}
      />
      <Yard yards={yards} />
    </div>
  );
};

export default AssociatedYardTabComponentGrid;
