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

  // const tabs = [
  //   {
  //     label: "Chantiers en cours",
  //     content: (
  //       <Yard
  //         projects={projects.filter(
  //           (project) => project.status?.name === "En cours"
  //         )}
  //       />
  //     )
  //   },
  //   {
  //     label: "Chantiers à venir",
  //     content: (
  //       <Yard
  //         projects={projects.filter(
  //           (project) => project.status?.name === "En pause"
  //         )}
  //       />
  //     )
  //   },
  //   {
  //     label: "Chantiers archivés",
  //     content: (
  //       <Yard
  //         projects={projects.filter(
  //           (project) => project.status?.name === "Terminé"
  //         )}
  //       />
  //     )
  //   }
  // ];

  return (
    <div className="flex flex-row bg-white h-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
          <p className="text-h1Desktop text-neutral-950  ">Mes chantiers</p>
        </div>
        //! à changer après
        <Yard projects={projects} />
        {/* <Tabs tabs={tabs} /> */}
      </div>
      <New />
    </div>
  );
}
