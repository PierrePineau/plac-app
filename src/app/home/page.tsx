"use client";

import Dropdown from "../components/customDropdown";
import DataTable from "../components/customTab";
import Header from "../components/header";
import NavBar from "../components/navBar";
import SearchBar from "../components/searchBar";
import Stats from "./components/stats";
import Yard from "../components/yard";
import "../globals.css";
import CustomButton from "../components/custombutton";
import { useState, useEffect } from "react";
import { useYardStore } from "@/store/yardStore";
import { useEmployeStore } from "@/store/employeeStore";
import { useRouter } from "next/navigation";

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
      const { avatar, firstName, lastName, email } = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img className="w-auto h-8 rounded-full" src={avatar} alt="Avatar" />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">
              {firstName} {lastName}
            </p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
      );
    }
  }
];

export default function Home() {
  const router = useRouter();
  const { yards, fetchYards } = useYardStore();
  const { employes, fetchEmployes } = useEmployeStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchYards();
    fetchEmployes();
  }, [fetchYards, fetchEmployes]);

  const ongoingYards = yards.filter((yard) => !yard.archived && !yard.deleted);
  const filteredEmployees = employes.filter((emp) =>
    emp.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const handleEmployeeClick = (employeeId: number) => {
    router.push(`/employee/detail/${employeeId}`);
  };

  const handleYardClick = (yardId: number) => {
    router.push(`/yard/detail/${yardId}`);
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
          <div className="flex flex-col">
            <p className="text-h1Desktop text-neutral-950 font-satoshi">
              Bonjour Jean Martin,
            </p>
            <p className="text-paragraphMedium font-satoshi text-neutral-400">
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
                yards.filter((yard) => yard.archived && !yard.deleted).length
              }
              redirectText="Voir mes chantiers à venir"
              onClick={() => router.push("/yards/upcoming")}
            />
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-4 w-1/2">
              <p className=" font-satoshi text-h2Desktop text-neutral-950">
                Mon équipe actuelle
              </p>
              <DataTable
                data={filteredEmployees}
                columns={columns}
                onRowClick={(row) => handleEmployeeClick(row.id)}
                ellipsisEnabled={false}
              />
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <p className=" font-satoshi text-h2Desktop text-neutral-950">
                Progression des chantiers en cours
              </p>
              <div className="flex flex-col gap-4">
                {ongoingYards.map((yard) => (
                  <div
                    key={yard.id}
                    className="p-4 border rounded-md shadow hover:shadow-lg cursor-pointer"
                    onClick={() => handleYardClick(yard.id)}>
                    <p className="font-satoshi text-neutral-950">{yard.name}</p>
                    <p className="text-sm text-neutral-600">
                      {yard.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
