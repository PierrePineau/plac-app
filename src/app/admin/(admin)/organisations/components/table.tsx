import DataTable from "@/components/DataTable";
import { useAdminStore } from "@/store/admin/adminStore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Field from "@/components/field";
import Link from "next/link";

const columns = [
    {
        accessorKey: "name",
        header: "Nom",
        cell: (info: any) => {
            const { uuid, name } = info.row.original;
            return (
                <Link
                  href={`/admin/organisations/${uuid}`}
                  className="link text-neutral-950">
                    {name}
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
    const { organisations, isFetchingOrganisations, fetchOrganisations } = useAdminStore();
    const results = organisations;

    useEffect(() => {
        fetchOrganisations();
    }, []);

    return (
        <>
            <Field 
                type="search"
                name="search"
                label="Rechercher"
                value=""
            />
            <DataTable
                isLoading={isFetchingOrganisations}
                data={results}
                columns={columns}
                ellipsisEnabled={false}
                enableSorting={false}
                />
        </>
    );
}
