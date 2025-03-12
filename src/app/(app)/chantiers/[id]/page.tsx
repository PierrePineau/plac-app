"use client";
import CustomButton from "@components/custombutton";
import { Printer } from "lucide-react";
import GeneralTab from "./tabsComponents/generalTab";
import DocumentsTab from "./tabsComponents/documentsTab";
import NotesGrid from "./tabsComponents/notesTab";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/user/projectStore";
import Tabs from "@components/tabs";
import Modify from "../components/modals/modify";
import Spinner from "@components/spinner";
import Btn from "@components/btn";
import { Image } from "@heroui/react";

export default function ProjectDetail() {
  const router = useRouter();
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <p className="text-xs sm:text-paragraphMedium text-neutral-400">
              <span className="sm:hidden">Chantiers / {project.name}</span>
              <span className="hidden sm:inline">
                Mes chantiers / {project.name}
              </span>
            </p>
            <h1 className="text-xl sm:text-h1Desktop font-bold text-neutral-900">
              {project.name}
            </h1>
          </div>
          <div className="flex flex-row gap-2 sm:gap-4">
            <Btn variant="light">
              <Printer className="text-neutral-950" />
              <span className="hidden sm:inline">Imprimer</span>
            </Btn>
            <div className="sm:hidden">
              <Modify id={id as string} title={""} />
            </div>
            <div className="hidden sm:block">
              <Modify id={id as string} title={"Modifier le chantier"} />
            </div>
          </div>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
