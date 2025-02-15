"use client";

import Dropdown from "../../../../components/customDropdown";
import DataTable from "../../../../components/customTab";
import Stats from "./components/stats";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/store/user/projectStore";
import { useOrganisationStore } from "@/store/user/organisationStore";
import { useAdminStore } from "@/store/admin/adminStore";

const employeeColumns = [
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
            <p className="font-satoshi text-paragraphBold text-neutral-950">
              {firstname} {lastname}
            </p>
            <p className="font-satoshi text-gray-500">{email}</p>
          </div>
        </div>
      );
    }
  }
];

const organisationColumns = [
  {
    accessorKey: "name",
    header: "Organisations",
    cell: (info: any) => {
      const { name } = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img
            className="w-auto h-8 rounded-full"
            src="/asset/img/avatar.svg"
            alt="Avatar"
          />
          <div className="flex flex-col">
            <p className="font-satoshi text-paragraphBold text-neutral-950">
              {name}
            </p>
          </div>
        </div>
      );
    }
  }
];

export default function Home() {
  const router = useRouter();
  const { organisations, users, fetchOrganisations, fetchUsers } =
    useAdminStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrganisations();
    fetchUsers();
  }, [fetchOrganisations, fetchUsers]);

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        user.email?.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  const filteredOrganisations = Array.isArray(organisations)
    ? organisations.filter((organisation) =>
        organisation.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="flex flex-col">
        <p className="text-h1Desktop text-neutral-950 font-satoshi">
          Bonjour Jean Martin,
        </p>
        <p className="text-paragraphMedium font-satoshi text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          imperdiet congue lectus.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-satoshi text-h2Desktop text-neutral-950">
          Organisations
        </p>
        <DataTable
          data={filteredOrganisations}
          columns={organisationColumns}
          ellipsisEnabled={false}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-satoshi text-h2Desktop text-neutral-950">
          Employés
        </p>
        <DataTable
          data={filteredUsers}
          columns={employeeColumns}
          ellipsisEnabled={false}
        />
      </div>
    </>
  );
}
