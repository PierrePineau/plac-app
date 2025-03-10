"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClientStore } from "@/store/user/clientStore";
import DataTable from "../../../components/CustomDataTable";
import SearchBar from "@/app/admin/(admin)/components/SearchBar";
import New from "./components/modals/new";
import Popup from "../../../components/popup";

const columns = [
  {
    id: "name",
    header: "Utilisateurs",
    accessorFn: (row: any) => row.name,
    cell: (info: any) => {
      const { avatar, firstname, lastname } = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img className="w-auto h-8" src="/asset/img/avatar.svg" alt="Logo Plac" />
          <p className="text-sm font-semibold">{firstname} {lastname}</p>
        </div>
      );
    }
  },
  {
    id: "email",
    header: "Email",
    accessorFn: (row: any) => row.email
  },
  {
    id: "phone",
    header: "Numéro de téléphone",
    accessorFn: (row: any) => row.phone
  }
];


export default function Employee() {
  const router = useRouter();
  const { data: clients, fetchData } = useClientStore();
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
    fetchData("");
  }, [fetchData]);

  const handleRowClick = (row: any) => {
    router.push(`/clients/${row.id}`);
  };

  const filteredClient = clients.filter((client) =>
    client.firstname?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white h-full p-4 sm:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xl sm:text-h1Desktop text-neutral-950">
            Mes chantiers
          </p>
          <button onClick={handleAddClient} className="mt-2 sm:mt-0">
            <New />
          </button>
        </div>
        <div className="w-full">
          <SearchBar
            label="Rechercher un client"
            placeholder="Rechercher"
            onChange={(e) => setSearch(e)}
          />
        </div>
        <DataTable
          data={filteredClient}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}
