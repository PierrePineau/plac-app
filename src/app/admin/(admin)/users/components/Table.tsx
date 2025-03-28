"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Field from "@/components/Field";
import Link from "next/link";
import { Search } from "lucide-react";
import { useUserStore } from "@/store/admin/userStore";
import DataTable from "@components/DataTable";

const columns = [
    {
        accessorKey: "email",
        header: "Nom",
        cell: (info: any) => {
            const { uuid, email } = info.row.original;
            return (
                <Link
                  href={`/admin/users/${uuid}`}
                  className="link text-neutral-950">
                    {email}
                </Link>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date de création",
        cell: (info: any) => {
            const { createdAt } = info.row.original;
            const formattedDate = format(new Date(createdAt), "dd/MM/yyyy HH:mm");
            return (
                formattedDate
            );
        },
    }
];

export default function Table() {
    const { data: users , fetchData: fetchUsers } = useUserStore()

    return (
        <>
            <Field
                type="search"
                name="search"
                placeholder="Rechercher un utilisateur"
                icon={<Search />}
                value=""
            />
            <DataTable
                store={useUserStore() as any}
                columns={columns}
                ellipsisEnabled={false}
                enableSorting={false}
                />
        </>
    );
}
