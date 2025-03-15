"use client";
import Field from "@/components/Field";
import { Search } from "lucide-react";
import { useProjectStore } from "@/store/user/projectStore";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import Yard from "@/components/Yard";
import Spinner from "@/components/Spinner";

export default function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: projects, fetchData } = useProjectStore();
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchData({
      limit: 100,
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


  const renderTabs = (projects?: Project[]) => {
      return (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {isLoading ? (
                  <Spinner message="" />
              ) : (
                  projects?.map((project) => (
                      <Yard key={project.id} project={project} />
                  ))
              )}
          </div>
      );
  }

  const tabs = [
    { 
      label: "Chantiers en cours",
      content: renderTabs(filteredProjects.filter((project) => project.status?.code === "A_FAIRE" || project.status?.code === "EN_COURS")) 
    },
    {
      label: "Chantiers à venir",
      content: renderTabs(filteredProjects.filter((project) => (project.status?.code === "A_FAIRE" || project.status?.code === "EN_COURS") && project.startAt && project.startAt.getTime() > Date.now()))
    },
    {
      label: "Chantiers archivés",
      content: renderTabs(filteredProjects.filter((project) => project.status?.code === "TERMINE"))
    } 
  ];

  return (
    <>
      <Field
        label="Rechercher un chantier"
        type="search"
        name="search"
        placeholder="Rechercher un chantier"
        startContent={<Search />}
        value={search}
        onChangeValue={setSearch}
      />
      <Tabs tabs={tabs} />
    </>
  );
}
