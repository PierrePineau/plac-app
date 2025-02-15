"use client";
import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import Header from "../components/header";
import CustomButton from "../components/custombutton";
import { Filter, PlusIcon } from "lucide-react";
import Yard from "../components/yard";
import Popup from "../components/popup";
import Dropdown from "../components/customDropdown";
import DragDrop from "./components/drag_file_component";
import { useProjectStore } from "@/store/user/projectStore";
import FormModal from "../components/formModal";
import CreateOrModifyYard from "./components/createOrModifyYard";
import Tabs from "../components/tabs";

export default function Chantiers() {
  const { projects, fetchProjects, createProject } = useProjectStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAddProject = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveProject = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const newProject: Omit<Project, "id"> = {
      uuid: crypto.randomUUID(),
      reference: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      notes: [],
      medias: [],
      organisaton: {
        id: 0,
        uuid: "",
        name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        employes: [],
        organisationModules: []
      },
      files: [],
      status: { id: 1, label: "En cours", color: "#007BFF" },
      createAt: new Date(),
      updateAt: new Date(),
      localisation: "10 Avenue des Champs-Élysées, Paris"
    };

    createProject(newProject);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const tabs = [
    {
      label: "Chantiers en cours",
      content: (
        <Yard
          yards={projects.filter(
            (project) => project.status.label === "En cours"
          )}
        />
      )
    },
    {
      label: "Chantiers à venir",
      content: (
        <Yard
          yards={projects.filter(
            (project) => project.status.label === "En pause"
          )}
        />
      )
    },
    {
      label: "Chantiers archivés",
      content: (
        <Yard
          yards={projects.filter(
            (project) => project.status.label === "Terminé"
          )}
        />
      )
    }
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
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-row justify-between">
            <p className="text-h1Desktop text-neutral-950 font-satoshi">
              Mes chantiers
            </p>
            <div className="flex flex-row">
              <CustomButton
                icon={<Filter className="text-neutral-950" />}
                text="Filtrer"
                color="bg-white"
                textColor="text-neutral-950"
                onClick={() => {}}
                hover={""}
              />
              <CustomButton
                icon={<PlusIcon className="text-white" />}
                text="Ajouter un chantier"
                color="bg-brand-950"
                textColor="text-white"
                onClick={handleAddProject}
                hover={"bg-brand-1000"}
              />
            </div>
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Ajouter un chantier"
        desc="Veuillez compléter les informations suivantes pour créer un projet.">
        <CreateOrModifyYard onSubmit={() => {}} submitLabel={"Ajouter"} />
      </Popup>
    </div>
  );
}
