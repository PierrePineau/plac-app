"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowSelectionChange?: (selectedRows: T[]) => void;
}

export default function DataTable<T extends object>({
  data,
  columns,
  onRowSelectionChange,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleRowSelection = (rowId: number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(rowId)) {
      newSelection.delete(rowId);
    } else {
      newSelection.add(rowId);
    }
    setSelectedRows(newSelection);

    if (onRowSelectionChange) {
      const selectedData = data.filter((_, index) => newSelection.has(index));
      onRowSelectionChange(selectedData);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      if (onRowSelectionChange) onRowSelectionChange([]);
    } else {
      const allRows = new Set(data.map((_, index) => index));
      setSelectedRows(allRows);
      if (onRowSelectionChange) onRowSelectionChange(data);
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-red-200">
      <table className="w-full border border-neutral-300">
        <thead className="bg-white text-sm text-gray-600 font-medium rounded-t-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="pr-8 border border-neutral-300">
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold border border-neutral-300"
                  onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <span className="ml-2 text-gray-400">
                      {header.column.getIsSorted() === "asc" ? "↑" : ""}
                      {header.column.getIsSorted() === "desc" ? "↓" : ""}
                    </span>
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
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.index)}
                  onChange={() => handleRowSelection(row.index)}
                />
              </td>
              {row.getVisibleCells().map((cell, idx) => (
                <td
                  key={cell.id}
                  className={`px-4 py-3 text-sm text-gray-800 ${
                    idx === 0 ? "flex items-center gap-2" : ""
                  }`}>
                  {idx === 0 ? (
                    <div className="flex items-center gap-2">
                      <img
                        src="/asset/img/avatar.svg"
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">Lorem ipsum</p>
                        <p className="text-sm text-gray-500">
                          jeanmartin@gmail.com
                        </p>
                      </div>
                    </div>
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
