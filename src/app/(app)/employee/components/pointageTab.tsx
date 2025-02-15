"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender
} from "@tanstack/react-table";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

const StatusBadge = ({ status }: { status: true | false }) => (
  <span
    className={`px-3 py-1 text-neutral-50 text-tag   rounded-lg inline-block ${
      status ? "bg-green-500" : "bg-red-500"
    }`}>
    {status ? "Entrée" : "Sortie"}
  </span>
);

export default function DataTable<T extends object>({
  data,
  columns
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const formatDate = (date: Date): string => {
    return (
      date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }) +
      " - " +
      date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
      })
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-neutral-300 rounded-lg">
        <thead className="bg-neutral-50 text-neutral-400   text-tag">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left border border-neutral-300 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 border border-neutral-300 text-neutral-500   text-tag">
                  {cell.column.id === "status" ? (
                    <StatusBadge status={cell.getValue() as true | false} />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
