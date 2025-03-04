"use client";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import Yard from "../../../components/yard";
import { useProjectStore } from "@/store/user/projectStore";
import { useOrganisationStore } from "@/store/user/organisationStore";
import New from "./components/modals/new";

export default function Chantiers() {
  const { data: projects, fetchData } = useProjectStore();
  const { data: organisation } = useOrganisationStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (organisation) {
      fetchData("");
    }
  }, [organisation, fetchData]);

  return (
    <div className="flex flex-col bg-white h-full p-4 sm:p-8">
      <div className="flex flex-row justify-between items-center">
        <p className="text-2xl sm:text-h1Desktop text-neutral-950">
          Mes chantiers
        </p>
        <div className="block sm:hidden">
          <New title={""} />
        </div>
        <div className="hidden sm:block">
          <New title={"Ajouter un chantier"} />
        </div>
      </div>
      <Yard projects={projects} />
    </div>
  );
}
