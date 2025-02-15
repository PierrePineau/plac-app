import DataTable from "@/components/customTab";
import { useAdminStore } from "@/store/admin/adminStore";
import { useEffect, useState } from "react";

const columns = [
  {
    accessorKey: "name",
    header: "Utilisateurs",
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

export default function Table() {
    const { users, fetchUsers } = useAdminStore();
    const results = users;

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <DataTable
            data={results}
            columns={columns}
            ellipsisEnabled={false}
            />
    );
}
