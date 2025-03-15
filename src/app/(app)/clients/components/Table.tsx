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
      const { uuid, name } = info.row.original;
      return (
        <Link href={`/clients/${uuid}`} className="link text-neutral-950">
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


// const columns = [
//   {
//     id: "name",
//     header: "Utilisateurs",
//     accessorFn: (row: any) => row.name,
//     cell: (info: any) => {
//       const { avatar, firstname, lastname } = info.row.original;
//       return (
//         <div className="flex items-center space-x-2">
//           <img className="w-auto h-8" src="/asset/img/avatar.svg" alt="Logo Plac" />
//           <p className="text-sm font-semibold">{firstname} {lastname}</p>
//         </div>
//       );
//     }
//   },
//   {
//     id: "email",
//     header: "Email",
//     accessorFn: (row: any) => row.email
//   },
//   {
//     id: "phone",
//     header: "Numéro de téléphone",
//     accessorFn: (row: any) => row.phone
//   }
// ];

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
