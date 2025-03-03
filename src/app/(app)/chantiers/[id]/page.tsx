"use client";

import CustomButton from "@/components/custombutton";
import { FileEdit, Printer } from "lucide-react";
import GeneralTab from "./tabsComponents/generalTab";
import DocumentsTab from "./tabsComponents/documentsTab";
import NotesGrid from "./tabsComponents/notesTab";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/user/projectStore";
import Tabs from "@/components/tabs";
import Modify from "../components/modals/modify";
import Spinner from "@/components/spinner";
import Btn from "@/components/btn";

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { data, getOneById, fetchData } = useProjectStore();
  const [project, setProject] = useState<Project | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleModifyProject = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (id) {
      localStorage.setItem("projectId", id as string);
      const projectData = getOneById(id as string);
      if (projectData) {
        setProject(projectData);
      } else {
        fetchData(null).then(() => {
          const fetchedproject = getOneById(id as string);
          setProject(fetchedproject || null);
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
    <>
      {/* Version Mobile */}
      <div className="sm:hidden flex flex-col bg-white">
        <img
          className="w-full h-48 object-cover"
          src="/asset/img/yard.jpeg"
          alt={project.name}
        />
        <div className="p-4 flex flex-col gap-3">
          <p className="text-xs text-neutral-400">Chantiers / {project.name}</p>
          <h1 className="text-xl font-bold text-neutral-900">{project.name}</h1>
          <div className="flex flex-row gap-2">
            <Btn variant="light">
              <Printer className="text-neutral-950" />
            </Btn>
            <Modify id={id as string} title={""} />
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>

      {/* Version Desktop */}
      <div className="hidden sm:flex flex-row bg-white h-full">
        <div className="flex flex-col w-full">
          <img
            className="w-full max-h-72 object-cover"
            src={"/asset/img/yard.jpeg"}
            alt={project.name}
          />
          <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-1">
                <p className="text-neutral-400 text-paragraphMedium">
                  Mes chantiers /
                </p>
                <p className="text-neutral-950 text-paragraphMedium">
                  {project.name}
                </p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-h1Desktop text-neutral-900">
                  {project.name}
                </h1>
                <div className="flex flex-row gap-4">
                  <Btn variant="light">
                    <Printer className="text-neutral-950" />
                    Imprimer
                  </Btn>
                  <Modify id={id as string} title={"Modifier le chantier"} />
                </div>
              </div>
            </div>
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </>
  );
}
