"use client";

import DataTable from "@/components/DataTable";
import { format } from "date-fns";
import Field from "@/components/Field";
import Link from "next/link";
import { Search } from "lucide-react";
import { useClientStore } from "@/store/user/clientStore";

const columns = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: (info: any) => {
      const { id, name } = info.row.original;
      return (
        <Link href={`/clients/${id}`} className="link text-neutral-950">
          {name}
        </Link>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info: any) => {
      const { email } = info.row.original;
      return email;
    }
  },
];

export default function Table() {
  return (
    <DataTable
      store={useClientStore() as any}
      columns={columns}
      ellipsisEnabled={false}
      enableSorting={false}
    >
      <Field
        name="search"
        placeholder="Rechercher un client"
        startContent={<Search />}
      />
    </DataTable>
  );
}
