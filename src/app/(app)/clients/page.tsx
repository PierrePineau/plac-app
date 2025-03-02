"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/custombutton";
import Header from "../../../components/headerpage";
import { PlusIcon } from "lucide-react";
import Popup from "../../../components/popup";
import { useRouter } from "next/navigation";
import { useClientStore } from "@/store/user/clientStore";
import DataTable from "../../../components/CustomDataTable";
import SearchBar from "@/app/admin/(admin)/components/searchBar";
import New from "./components/modals/new";

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

  const handleRowClick = (row: { id: number }) => {
    router.push(`/clients/${row.id}`);
  };

  const filteredClient = clients.filter((client) =>
    client.firstname?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-row bg-white h-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-row justify-between">
            <p className="text-h1Desktop text-neutral-950">Mes chantiers</p>
            <New />
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
    </div>
  );
}
