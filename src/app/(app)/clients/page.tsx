// Chantiers.tsx
"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/custombutton";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import { PlusIcon } from "lucide-react";
import Popup from "../../../components/popup";
import SearchBar from "../../../components/searchBar";
import { useRouter } from "next/navigation";
import { useClientStore } from "@/store/user/clientStore";
import DataTable from "../../../components/DataTable";
import CreateOrModifyClient from "./components/createOrModifyClient";

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
    accessorKey: "phone",
    header: "Numéro de téléphone"
  }
];

export default function Employee() {
  const router = useRouter();
  const { clients, fetchClients, createClient } = useClientStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleAddClient = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleRowClick = (row: { id: number }) => {
    router.push(`/clients/detail/${row.id}`);
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

    createClient(newEmploye);
    setIsPopupOpen(false);
  };

  const filteredClient = clients.filter((client) =>
    client.firstname?.toLowerCase().includes(search.toLowerCase())
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
            <p className="text-h1Desktop text-neutral-950  ">
              Mes chantiers
            </p>
            <CustomButton
              icon={<PlusIcon className="text-white" />}
              text="Ajouter un client"
              color="bg-brand-950"
              textColor="text-white"
              onClick={handleAddClient}
              hover={""}
            />
          </div>
          <div className="flex justify-start">
            <SearchBar
              label="Rechercher un client"
              placeholder="Rechercher"
              onChange={(e: string) => setSearch(e)}
            />
          </div>
          <DataTable
            data={filteredClient}
            columns={columns}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Ajouter un client"
        desc="Vous pouvez ajouter un nouvel client sur l’application.">
        <CreateOrModifyClient
          onSubmit={handleSaveEmployee}
          submitLabel={"Ajouter le client"}
        />
      </Popup>
    </div>
  );
}
