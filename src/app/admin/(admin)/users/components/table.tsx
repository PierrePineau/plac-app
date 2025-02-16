import DataTable from "@/components/DataTable";
import { useAdminStore } from "@/store/admin/adminStore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Field from "@/components/field";
import Link from "next/link";
import { Search } from "lucide-react";

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
    const { users, isFetchingUsers, fetchUsers } = useAdminStore();
    const results = users;

    useEffect(() => {
        fetchUsers();
        console.log("Fetching users");
        console.log(users);
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

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
                isLoading={isFetchingUsers}
                data={results}
                columns={columns}
                ellipsisEnabled={false}
                enableSorting={false}
                />
        </>
    );
}
