"use client";

import DataTable from "@components/CustomDataTable";
import { format } from "date-fns";
import Field from "@components/field";
import Link from "next/link";
import { Search } from "lucide-react";
import { useOrganisationStore } from "@/store/admin/organisationStore";

const columns = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: (info: any) => {
      const { uuid, name } = info.row.original;
      return (
        <Link href={`/admin/organisations/${uuid}`} className="link text-neutral-950">
          {name}
        </Link>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date de création",
    cell: (info: any) => {
      const { createdAt } = info.row.original;
      const formattedDate = format(new Date(createdAt), "dd/MM/yyyy HH:mm");
      return formattedDate;
    }
  }
];

export default function OrganisationTable() {
  const { data, fetchData } = useOrganisationStore();
  return (
    <DataTable
      fetchData={fetchData}
      data={data}
      columns={columns}
      ellipsisEnabled={false}
      enableSorting={false}
    >
      <Field
        type="search"
        name="search"
        placeholder="Rechercher une organisation"
        icon={<Search />}
        value=""
      />
    </DataTable>
  );
}
