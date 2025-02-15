// Chantiers.tsx
"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/custombutton";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import Yard from "../../../components/yard";
import { Filter, PlusIcon } from "lucide-react";
import Popup from "../../../components/popup";
import Dropdown from "../../../components/customDropdown";
import DataTable from "../../../components/customTab";
import SearchBar from "../../../components/searchBar";
import { useEmployeStore } from "@/store/user/employeeStore";
import { useRouter } from "next/navigation";
import CreateOrModifyEmployee from "./components/createOrModifyEmployee";

const columns = [
  {
    accessorKey: "name",
    header: "Utilisateurs",
    cell: (info: any) => {
      const { avatar, firstname, lastname } = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img
            className="w-auto h-8"
            src="/asset/img/avatar.svg"
            alt="Logo Plac"
          />

          <p className="text-sm font-semibold">
            {firstname} {lastname}
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
    accessorKey: "telephone",
    header: "Numéro de téléphone"
  }
];

export default function Employee() {
  const router = useRouter();
  const { employes, fetchEmployes, createEmploye } = useEmployeStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleAddEmployee = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    fetchEmployes();
  }, [fetchEmployes]);

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
      phone: formData.get("telephone") as string
    };

    createEmploye(newEmploye);
    setIsPopupOpen(false);
  };

  const filteredEmployees = employes.filter((emp) =>
    emp.firstname?.toLowerCase().includes(search.toLowerCase())
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
            <CustomButton
              icon={<PlusIcon className="text-white" />}
              text="Ajouter un employee"
              color="bg-brand-950"
              textColor="text-white"
              onClick={handleAddEmployee}
              hover={""}
            />
          </div>
          <div className="flex justify-start">
            <SearchBar
              label="Rechercher un employée"
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
        onClose={handleClosePopup}
        title="Ajouter un employer"
        desc="Vous pouvez ajouter un nouvel employé sur l’application.">
        <CreateOrModifyEmployee
          onSubmit={handleSaveEmployee}
          submitLabel={"Ajouter l'employé"}
        />
      </Popup>
    </div>
  );
}
