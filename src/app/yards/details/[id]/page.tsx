"use client";

import NavBar from "@/app/components/navBar";
import "../../../globals.css";
import Header from "@/app/components/header";
import CustomButton from "@/app/components/custombutton";
import { FileEdit, Printer } from "lucide-react";
import Tabs from "../../components/tabs";
import GeneralTab from "../tabsComponents/generalTab";
import DocumentsTab from "../tabsComponents/documentsTab";
import NotesGrid from "../tabsComponents/notesTab";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import Popup from "@/app/components/popup";
import CreateOrModifyYard from "../../components/createOrModifyYard";

export default function projectDetail() {
  const router = useRouter();
  const { id } = useParams();
  const getProjectById = useProjectStore((state) => state.getProjectById);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
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
      const projectData = getProjectById(Number(id));
      if (projectData) {
        setProject(projectData);
      } else {
        fetchProjects().then(() => {
          const fetchedproject = getProjectById(Number(id));
          setProject(fetchedproject || null);
        });
      }
    }
  }, [id, getProjectById, fetchProjects]);

  if (!project) {
    return <div>Chargement des détails du chantier...</div>;
  }

  const tabs = [
    { label: "Général", content: <GeneralTab project={project} /> },
    {
      label: "Documents & Médias",
      content: <DocumentsTab project={project} />
    },
    { label: "Bloc notes", content: <NotesGrid notes={project.notes || []} /> }
  ];

  return (
    <div className="flex flex-row bg-white h-full">
      <div className="sticky bg-white hidden md:block border-r border-neutral-200">
        <NavBar />
      </div>

      <div className="flex flex-col w-full">
        <div className="top-0 bg-white z-10 border-b border-neutral-200">
          <Header />
        </div>
        <img
          className="w-full max-h-72 object-cover"
          src={"/asset/img/yard.jpeg"}
          alt={project.name}
        />
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <p className="text-neutral-400 font-satoshi text-paragraphMedium">
                Mes chantiers /
              </p>
              <p className=" text-neutral-950 text-paragraphMedium font-satoshi">
                {project.name}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className=" font-satoshi text-h1Desktop text-neutral-900">
                {project.name}
              </h1>
              <div className="flex flex-row gap-4">
                <CustomButton
                  text="Imprimer"
                  icon={<Printer />}
                  color="bg-white"
                  textColor="text-neutral-950"
                  onClick={() => router.push(`/project/edit/${project.id}`)}
                  hover={"bg-neutral-100"}
                  border="border border-neutral-200"
                />
                <CustomButton
                  text="Modifier les informations"
                  icon={<FileEdit />}
                  color="bg-brand-950"
                  textColor="text-white"
                  onClick={handleModifyProject}
                  hover={"bg-brand-1000"}
                />
              </div>
            </div>
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Modifier les informations">
        <CreateOrModifyYard
          onSubmit={() => {}}
          submitLabel={"Modifier"}
          defaultValues={{
            name: project.name,
            description: project.description,
            startDate: undefined,
            endDate: undefined,
            chief: project.organisaton.name,
            status: project.status.label,
            adress: project.localisation,
            postal_code: project.uuid,
            city: project.description
          }}
        />
      </Popup>
    </div>
  );
}
