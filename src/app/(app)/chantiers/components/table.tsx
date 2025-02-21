"use client";

import DataTable from "@/components/DataTable";
import Field from "@/components/field";
import Link from "next/link";
import { Search } from "lucide-react";
import { useProjectStore } from "@/store/user/projectStore";

const columns = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: (info: any) => {
      const { id, name } = info.row.original;
      return (
        <Link href={`/chantiers/${id}`} className="link text-neutral-950">
          {name}
        </Link>
      );
    }
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date de création",
  //   cell: (info: any) => {
  //     const { createdAt } = info.row.original;
  //     const formattedDate = format(new Date(createdAt), "dd/MM/yyyy HH:mm");
  //     return formattedDate;
  //   }
  // }
];

export default function Table() {
  return (
    <DataTable
      store={useProjectStore()}
      columns={columns}
      ellipsisEnabled={false}
      enableSorting={false}
    >
      <Field
        type="search"
        name="search"
        placeholder="Rechercher un chantier"
        icon={<Search />}
        value=""
      />
    </DataTable>
  );
}
