"use client";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import Yard from "../../../components/yard";
import { useProjectStore } from "@/store/user/projectStore";
import { useOrganisationStore } from "@/store/user/organisationStore";
import New from "./components/modals/new";
import HeaderPage from "@/components/headerpage";

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
    <div className="flex flex-col gap-4">
      <HeaderPage title="Mes chantiers">
        <New title={"Ajouter un chantier"} />
      </HeaderPage>
      <Yard projects={projects} />
    </div>
  );
}
