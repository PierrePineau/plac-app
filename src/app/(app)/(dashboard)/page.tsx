"use client";
import Dropdown from "../../../components/customDropdown";
import DataTable from "../../../components/DataTable";
import Stats from "./components/stats";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../../../components/progressBar";
import { useProjectStore } from "@/store/user/projectStore";
import { useClientStore } from "@/store/user/clientStore";
import { useAuthStore } from "@/store/useAuthStore";

type TableData = {
  user: string;
  number: string;
  date: string;
  content?: string;
  status?: string;
};

const columns = [
  {
    accessorKey: "name",
    header: "Utilisateurs",
    cell: (info: any) => {
      const { firstname, lastname, email } = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img
            className="w-auto h-8 rounded-full"
            src="/asset/img/avatar.svg"
            alt="Avatar"
          />
          <div className="flex flex-col">
            <p className="text-paragraphBold text-neutral-950">
              {firstname} {lastname}
            </p>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
      );
    }
  }
];

export default function Home() {
  const router = useRouter();
  const { data: projectData, fetchData: fetchProjectData } = useProjectStore();
  const { data: clientData, fetchData: fetchClientData } = useClientStore();
  const [search, setSearch] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    fetchProjectData("");
  }, [fetchProjectData]);

  useEffect(() => {
    fetchClientData("");
  }, [fetchClientData]);

  const ongoingYards = projectData.filter(
    (project) => project.status?.name === "En cours"
  );
  const futureYards = projectData.filter(
    (project) => project.status?.name === "En cours"
  );

  const handleEmployeeClick = (employeeId: number) => {
    router.push(`/employee/detail/${employeeId}`);
  };

  const handleYardClick = (yardId: number) => {
    router.push(`/yard/detail/${yardId}`);
  };

  return (
    <div className="flex flex-col bg-white overflow-auto p-4 sm:p-8 gap-4 sm:gap-8">
      <div className="flex flex-col">
        <p className="text-2xl sm:text-h1Desktop text-neutral-950">
          Bonjour { user?.fullname },
        </p>
        <p className="text-base sm:text-paragraphMedium text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          imperdiet congue lectus.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Stats
          title="Total d'utilisateur"
          value={clientData.length}
          redirectText="???"
          onClick={() => {}}
        />
        <Stats
          title="Nombre de chantiers en cours"
          value={ongoingYards.length}
          redirectText="Voir mes chantiers en cours"
          onClick={() => router.push("/yards")}
        />
        <Stats
          title="Nombre de chantiers à venir"
          value={futureYards.length}
          redirectText="Voir mes chantiers à venir"
          onClick={() => router.push("/yards")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl sm:text-h2Desktop text-neutral-950">
          Mon équipe actuelle
        </p>
        {/* DataTable à intégrer si besoin */}
      </div>
    </div>
  );
}
