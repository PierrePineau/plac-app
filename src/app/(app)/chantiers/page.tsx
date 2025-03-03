"use client";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import Yard from "../../../components/yard";
import { useProjectStore } from "@/store/user/projectStore";
import Tabs from "../../../components/tabs";
import { useOrganisationStore } from "@/store/user/organisationStore";
import Btn from "@/components/btn";
import New from "./components/modals/new";

export default function Chantiers() {
  const { data: projects, fetchData, create } = useProjectStore();
  const { data: organisation } = useOrganisationStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (organisation) {
      fetchData("");
    }
  }, [fetchData]);

  const handleAddProject = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="sm:hidden flex flex-col bg-white h-full p-4">
        <div className="flex flex-row justify-between items-center">
          <p className="text-2xl text-neutral-950">Mes chantiers</p>
          <New title={""} />
        </div>
        <Yard projects={projects} />
      </div>
      <div className="hidden sm:flex flex-row bg-white h-full p-8">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center">
            <p className="text-h1Desktop text-neutral-950">Mes chantiers</p>
            <New title={"Ajouter un chantier"} />
          </div>
          <Yard projects={projects} />
        </div>
      </div>
    </>
  );
}
