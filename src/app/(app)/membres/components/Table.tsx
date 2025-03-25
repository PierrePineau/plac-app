"use client";

import DataTable from "@/components/DataTable";
import Field from "@/components/Field";
import Link from "next/link";
import { Search } from "lucide-react";
import { useUserStore } from "@/store/user/userStore";

const columns = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: (info: any) => {
      const { id, fullname } = info.row.original;
      return (
        <Link href={`/membres/${id}`} className="link text-neutral-950">
          {fullname}
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
  // {
  //   accessorKey: "createdAt",
  //   header: "Date de création",
  //   cell: (info: any) => {
  //     const { createdAt } = info.row.original;
  //     if (createdAt) {
  //       const formattedDate = format(new Date(createdAt), "dd/MM/yyyy HH:mm");
  //       return formattedDate;
  //     }else{
  //       return "";
  //     }
  //   }
  // }
];

export default function Table() {
  return (
    <DataTable
      store={useUserStore() as any}
      columns={columns}
      ellipsisEnabled={false}
      enableSorting={false}
    >
      <Field
        type="search"
        name="search"
        placeholder="Rechercher un membre"
        icon={<Search />}
        value=""
      />
    </DataTable>
  );
}
