// Chantiers.tsx
"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "../components/custombutton";
import Header from "../components/header";
import NavBar from "../components/navBar";
import Yard from "../components/yard";
import "../globals.css";
import { Filter, PlusIcon } from "lucide-react";
import Popup from "../components/popup";
import Dropdown from "../components/customDropdown";
import DataTable from "../components/customTab";
import SearchBar from "../components/searchBar";
import { useEmployeStore } from "@/store/employeeStore";
import { useRouter } from "next/navigation";

const columns = [
  {
    accessorKey: "name",
    header: "Utilisateurs",
    cell: (info: any) => {
      const { avatar, firstName, lastName, email } = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img className="w-auto h-8" src={avatar} alt="Logo Plac" />

          <p className="text-sm font-semibold">
            {firstName} {lastName}
          </p>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "phone",
    header: "Numéro de téléphone"
  }
];

export default function Employee() {
  const router = useRouter();
  const { employes, fetchEmployes, addEmploye } = useEmployeStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployes();
  }, [fetchEmployes]);

  const handleAddEmployee = () => {
    setIsPopupOpen(true);
  };
  const handleRowClick = (row: { id: number }) => {
    router.push(`/employee/detail/${row.id}`);
  };

  const handleSaveEmployee = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const newEmploye = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string
    };

    addEmploye(newEmploye);
    setIsPopupOpen(false);
  };

  const filteredEmployees = employes.filter((emp) =>
    emp.firstName.toLowerCase().includes(search.toLowerCase())
  );

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
                onClick={handleAddEmployee}
                hover={""}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <SearchBar
              label="Rechercher un utilisateur"
              placeholder="Rechercher"
              onChange={(e: string) => setSearch(e)}
            />
          </div>
          <DataTable
            data={filteredEmployees}
            columns={columns}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => {}}
        title="Ajouter un employer"
        desc="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum">
        <form className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="name"
              className=" font-satoshi text-paragraphMedium text-neutral-950">
              Nom du chantier
            </label>
            <input
              type="text"
              id="name"
              className=" flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Nom du chantier"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className=" font-satoshi text-paragraphMedium text-neutral-950">
              Description
            </label>
            <textarea
              id="description"
              className="flex min-h-40 p-3 justify-center items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <div>
              <label
                htmlFor="name"
                className=" font-satoshi text-paragraphMedium text-neutral-950">
                Date de début
              </label>
              <input
                type="date"
                id="name"
                className=" flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                placeholder="Date de début"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className=" font-satoshi text-paragraphMedium text-neutral-950">
                Date de fin
              </label>
              <input
                type="date"
                id="name"
                className=" flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                placeholder="Date de fin"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <div>
              <label
                htmlFor="name"
                className=" font-satoshi text-paragraphMedium text-neutral-950">
                Chef de chantier
              </label>
              <input
                type="text"
                id="name"
                className=" flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                placeholder="Chef de chantier"
              />
            </div>
            <div>
              <Dropdown
                label="Status"
                options={["test", "test2", "test3"]}
                maxWidth="min-w-56"
              />
            </div>
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
