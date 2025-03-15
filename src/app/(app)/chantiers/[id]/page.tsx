"use client";
import { Printer } from "lucide-react";
import GeneralTab from "./components/GeneralTab";
import DocumentsTab from "./components/DocumentsTab";
import NotesGrid from "./components/NotesTab";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/user/projectStore";
import Tabs from "@components/Tabs";
import Edit from "../components/modals/Edit";
import Spinner from "@components/Spinner";
import Btn from "@components/btn";
import { Image } from "@heroui/react";
import HeaderPage from "@components/HeaderPage";

// export const metadata: Metadata = {
//   title: "Chantiers",
// };

export default function ProjectDetail() {
  const { id } = useParams();
  const { data, getOneById, fetchData } = useProjectStore();
  const [project, setProject] = useState<Project | null>(null);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    if (project && project.thumbnail) {
      const idOrg = localStorage.getItem("idOrganisation");
      setPath(`/${idOrg}/fichiers/${project.thumbnail.url}`);
    }else {
      setPath('/asset/img/yard.jpeg');
    }
  }, [project]);

  useEffect(() => {
    if (id) {
      localStorage.setItem("projectId", id as string);
      const projectData = getOneById(id as string);
      if (projectData) {
        setProject(projectData);
      } else {
        fetchData(null).then(() => {
          const fetchedProject = getOneById(id as string);
          setProject(fetchedProject || null);
        });
      }
    }
  }, [id, getOneById, fetchData]);

  if (!project) {
    return <Spinner message="Chargement des détails du chantier..." />;
  }

  const tabs = [
    { label: "Général", content: <GeneralTab project={project} /> },
    {
      label: "Documents & Médias",
      content: <DocumentsTab project={project} />
    },
    { label: "Bloc notes", content: <NotesGrid /> }
  ];


  return (
    <div className="bg-white h-full flex flex-col">
      { path != "" && (
          <Image alt={project.name} className="w-full object-cover h-48 sm:h-72" width={"100%"} radius="sm" src={path} />
      )}
      <div className="p-4 sm:p-8 flex flex-col gap-8 overflow-auto">
        <HeaderPage
            showBreadcrumb={true}
          title={project.name}
          >
          <Btn variant="light">
            <Printer className="text-neutral-950" />
            <span className="hidden sm:inline">Imprimer</span>
          </Btn>
          <Edit project={project} />
        </HeaderPage>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
