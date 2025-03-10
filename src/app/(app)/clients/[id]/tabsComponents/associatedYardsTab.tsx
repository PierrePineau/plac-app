"use client";
import React, { useState } from "react";
import Yard from "@components/yard";
import SearchBar from "@/app/(app)/components/searchBar";

const AssociatedYardTabComponentGrid: React.FC<{ yards: Project[] }> = ({
  yards
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 sm:p-8 flex flex-col gap-6">
      <div className="w-full">
        <SearchBar
          label="Rechercher un chantier"
          placeholder="Rechercher un chantier"
          onChange={(e: string) => setSearch(e)}
        />
      </div>
      <Yard yards={yards} />
    </div>
  );
};

export default AssociatedYardTabComponentGrid;
