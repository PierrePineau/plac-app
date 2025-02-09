import BubbleText from "@/app/components/bubbleText";
import CustomButton from "@/app/components/custombutton";
import { File, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import SearchBar from "@/app/components/searchBar";
import Popup from "@/app/components/popup";
import EndOfSheetCard from "../../components/viewEndOfSheet";
import DataTable from "../../components/pointageTab";

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

const columns = [
  {
    accessorKey: "date",
    header: "Date et Horaire",
    cell: ({ row }: { row: any }) => formatDate(new Date(row.original.date)) // Conversion ici
  },
  {
    accessorKey: "status",
    header: "Status"
  }
];

const PointagesTabComponentGrid: React.FC<{ pointages: Pointage[] }> = ({
  pointages
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <div className="max-w-md min-w-80 h-full rounded-lg">
          <label
            htmlFor="startDate"
            className="font-satoshi text-paragraphMedium text-neutral-950">
            Rechercher une date
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white font-satoshi text-paragraphMedium text-neutral-950">
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>
        <div className="max-w-md min-w-80 h-full rounded-lg">
          <label
            htmlFor="status"
            className="font-satoshi text-paragraphMedium text-neutral-950">
            Statut
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white font-satoshi text-paragraphMedium text-neutral-950">
            <select
              id="status"
              name="status"
              className="w-full bg-transparent outline-none appearance-none"
              required>
              <option value="true">Entrée</option>
              <option value="false">Sortie</option>
            </select>
          </div>
        </div>
      </div>
      <DataTable data={pointages} columns={columns} />
    </div>
  );
};

export default PointagesTabComponentGrid;
