"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender
} from "@tanstack/react-table";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

interface DataTableProps<T> {
  children?: React.ReactNode;
  data: T[];
  fetchData?: (filters: any) => Promise<void>;
  isLoading?: boolean;
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
  enableSearch?: boolean;
}

export default function DataTable<T extends object>({
  children,
  data = [],
  fetchData,
  isLoading = false,
  columns,
  onRowSelectionChange,
  renderCell,
  onRowClick,
  enableSorting = true,
  enableRowSelection = true,
  ellipsisEnabled = true,
  enableSearch = true
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [rows, setRows] = useState<T[]>(data);
  const [loading, setLoading] = useState(isLoading);

  const handleRowSelection = useCallback(
    (rowId: number) => {
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
    },
    [enableRowSelection, onRowSelectionChange, data, selectedRows]
  );

  const handleSelectAll = useCallback(() => {
    if (!enableRowSelection) return;
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      if (onRowSelectionChange) onRowSelectionChange([]);
    } else {
      const allRows = new Set(data.map((_, index) => index));
      setSelectedRows(allRows);
      if (onRowSelectionChange) onRowSelectionChange(data);
    }
  }, [enableRowSelection, selectedRows, data, onRowSelectionChange]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: enableSorting ? setSorting : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filters: any = {};
    formData.forEach((value, key) => {
      filters[key] = value;
    });
    loadData(filters);
  };

  const loadData = (filters = {}) => {
    if (!fetchData) return;
    setLoading(true);
    fetchData(filters).then(() => {
      // setRows(newData);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!fetchData) {
      setRows(data);
    }
  }, [data, fetchData]);

  useEffect(() => {
    if (data && data.length > 0) {
      setRows(data);
    } else if (fetchData) {
      loadData();
    }
  }, [data, fetchData]);

  return (
    <div className="flex flex-col w-full gap-4">
      {enableSearch && (
        <form onSubmit={handleSubmit} className="flex w-full">
          {children}
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="w-full rounded-md">
          <thead className="text-neutral-400 text-sm">
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
          <tbody>
            {!loading &&
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} onClick={() => onRowClick?.(row.original)}>
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
                      className="text-sm text-neutral-600 flex-row justify-between">
                      {renderCell
                        ? renderCell(
                            cell.getValue(),
                            cell.column.columnDef,
                            row.original
                          )
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
            {loading && (
              <tr className="text-sm text-neutral-600 flex-row justify-between isLoading">
                <td colSpan={columns.length + 1} className="p-0">
                  <div className="flex justify-center items-center min-h-14">
                    <div className="animate-spin text-neutral-400">
                      <LoaderCircle width={32} height={32} />
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
