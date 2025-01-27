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
import { useProjectStore } from "@/store/projectStore";

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
      updateAt: new Date()
    };

    createProject(newProject);
    setIsPopupOpen(false);
  };

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
                hover={""}
              />
            </div>
          </div>
          <Yard yards={projects} />
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Ajouter un chantier"
        desc="Veuillez compléter les informations suivantes pour créer un projet.">
        <form className="flex flex-col gap-2" onSubmit={handleSaveProject}>
          <div>
            <label
              htmlFor="name"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Nom du chantier
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Nom du chantier"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="flex min-h-40 p-3 justify-center items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Description"
              required
            />
          </div>
          <div>
            <label
              htmlFor="adress"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Adresse
            </label>
            <input
              type="text"
              id="adress"
              name="adress"
              className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Adresse"
              required
            />
          </div>
          <div>
            <label
              htmlFor="postal_code"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Code Postal
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              required
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-brand-950 text-white px-4 py-2 rounded-md hover:bg-brand-700">
            Enregistrer
          </button>
        </form>
      </Popup>
    </div>
  );
}
