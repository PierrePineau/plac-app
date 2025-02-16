"use client";

import Dropdown from "../../../components/customDropdown";
import DataTable from "../../../components/DataTable";
import Stats from "./components/stats";
import { useState, useEffect } from "react";
import { useEmployeStore } from "@/store/user/employeeStore";
import { useRouter } from "next/navigation";
import ProgressBar from "../../../components/progressBar";
import { useProjectStore } from "@/store/user/projectStore";

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
      const { firstname, lastname, email, username } = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img
            className="w-auto h-8 rounded-full"
            src="/asset/img/avatar.svg"
            alt="Avatar"
          />
          <div className="flex flex-col">
            <p className="  text-paragraphBold text-neutral-950">
              {firstname} {lastname}
            </p>
            <p className="  text-gray-500">{email}</p>
          </div>
        </div>
      );
    }
  }
];

export default function Home() {
  const router = useRouter();
  const { projects, fetchProjects } = useProjectStore();
  const { employes, fetchEmployes } = useEmployeStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchEmployes();
  }, [fetchProjects, fetchEmployes]);

  const ongoingYards = projects.filter(
    (project) => project.status.label === "En cours"
  );
  const filteredEmployees = employes.filter((emp) =>
    emp.firstname?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEmployeeClick = (employeeId: number) => {
    router.push(`/employee/detail/${employeeId}`);
  };

  const handleYardClick = (yardId: number) => {
    router.push(`/yard/detail/${yardId}`);
  };

  return (
      <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
        <div className="flex flex-col">
          <p className="text-h1Desktop text-neutral-950  ">
            Bonjour Jean Martin,
          </p>
          <p className="text-paragraphMedium   text-neutral-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            imperdiet congue lectus.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Stats
            title="Total d'utilisateur"
            value={employes.length}
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
            value={
              projects.filter(
                (project) => project.status.label === "En cours"
              ).length
            }
            redirectText="Voir mes chantiers à venir"
            onClick={() => router.push("/yards")}
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="   text-h2Desktop text-neutral-950">
            Mon équipe actuelle
          </p>
          <DataTable
            data={filteredEmployees}
            columns={columns}
            onRowClick={(row) => handleEmployeeClick(row.id)}
            ellipsisEnabled={false}
          />
        </div>
      </div>
  );
}
