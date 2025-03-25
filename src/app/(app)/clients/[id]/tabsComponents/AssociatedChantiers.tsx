"use client";
import React, { useEffect, useState } from "react";
import Field from "@components/Field";
import { Search } from "lucide-react";
import Spinner from "@components/Spinner";
import Yard from "@components/Yard";
import { useProjectStore } from "@/store/user/projectStore";

const AssociatedChantiers: React.FC<{
    client: Client;
}> = ({ client }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: projects, fetchData } = useProjectStore();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchData({
      limit: 100,
      idClient: client.id,
    }).then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [search, projects]);

  return (
    <div className="flex flex-col gap-6">
        <Field
            label="Rechercher un chantier"
            type="search"
            name="search"
            placeholder="Rechercher un chantier"
            startContent={<Search />}
            value={search}
            onChangeValue={setSearch}
        />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {isLoading ? (
                <Spinner message="" />
            ) : (
                projects?.map((project) => (
                    <Yard key={project.id} project={project} />
                ))
            )}
        </div>
    </div>
  );
};

export default AssociatedChantiers;
