import DataTable from "@/components/customTab";
import { useAdminStore } from "@/store/admin/adminStore";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const columns = [
    {
        accessorKey: "name",
        header: "Nom",
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
    const { organisations, fetchOrganisations } = useAdminStore();
    const results = organisations;

    useEffect(() => {
        fetchOrganisations();
    }, []);

    return (
        <DataTable
            data={results}
            columns={columns}
            ellipsisEnabled={false}
            />
    );
}
