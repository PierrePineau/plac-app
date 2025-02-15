"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender
} from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowSelectionChange?: (selectedRows: T[]) => void;
  renderCell?: (
    cellValue: any,
    column: ColumnDef<T>,
    row: T
  ) => React.ReactNode;
  onRowClick?: (row: T) => void;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  ellipsisEnabled?: boolean;
}

export default function DataTable<T extends object>({
  data,
  columns,
  onRowSelectionChange,
  renderCell,
  onRowClick,
  enableSorting = true,
  enableRowSelection = true,
  ellipsisEnabled = true
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleRowSelection = (rowId: number) => {
    if (!enableRowSelection) return;

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
    if (!enableRowSelection) return;

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
    state: { sorting },
    onSortingChange: enableSorting ? setSorting : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-md">
        {/* Header */}
        <thead className=" text-neutral-400 text-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {enableRowSelection && (
                <th className="w-14">
                    <label className="w-full h-12 m-auto cursor-pointer flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.size === data.length}
                        onChange={handleSelectAll}
                      />
                    </label>
                </th>
              )}
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`p-3 text-left ${
                    header.column.getCanSort() ? "cursor-pointer" : ""
                  }`}
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

        {/* Body */}
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={``}
              onClick={() => onRowClick?.(row.original)}>
              {enableRowSelection && (
                <td className="w-14 text-center">
                  <label className="w-full h-12 m-auto cursor-pointer flex justify-center items-center">
                  <input
                      type="checkbox"
                      checked={selectedRows.has(row.index)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleRowSelection(row.index);
                      }}
                    />
                  </label>
                </td>
              )}
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className="text-sm text-neutral-800 flex-row justify-between">
                  {renderCell
                    ? renderCell(
                        cell.getValue(),
                        cell.column.columnDef,
                        row.original
                      )
                    : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {index === row.getVisibleCells().length - 1 &&
                    ellipsisEnabled && (
                      <button
                        className="ml-2"
                        onClick={(e) => e.stopPropagation()}>
                        <EllipsisVertical />
                      </button>
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
