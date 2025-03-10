import BubbleText from "@components/bubbleText";
import CustomButton from "@components/custombutton";
import { File, PlusIcon } from "lucide-react";
import React, { useState } from "react";
// import SearchBar from "@components/searchBar";
import Popup from "@components/popup";
import EndOfSheetCard from "../components/viewEndOfSheet";
import DataTable from "../components/pointageTab";

const formatDate = (date: Date): string => {
  return (
    date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }) +
    " - " +
    date.toLocaleString("fr-FR", {
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

const PointagesTabComponentGrid: React.FC<{ pointages: any[] }> = ({
  pointages
}) => {
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const filteredPointages = pointages.filter((pointage) => {
    const pointageDate = new Date(pointage.date).toISOString().split("T")[0];
    const dateMatch = searchDate ? pointageDate === searchDate : true;
    const statusMatch =
      searchStatus !== ""
        ? pointage.status === (searchStatus === "true")
        : true;
    return dateMatch && statusMatch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <div className="max-w-md min-w-80 h-full rounded-lg">
          <label
            htmlFor="startDate"
            className="  text-paragraphMedium text-neutral-950">
            Rechercher une date
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white   text-paragraphMedium text-neutral-950">
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="w-full bg-transparent outline-none"
              required
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
        </div>
        <div className="max-w-md min-w-80 h-full rounded-lg">
          <label
            htmlFor="status"
            className="  text-paragraphMedium text-neutral-950">
            Statut
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white   text-paragraphMedium text-neutral-950">
            <select
              id="status"
              name="status"
              className="w-full bg-transparent outline-none appearance-none"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}>
              <option value="">Tous</option>
              <option value="true">Entrée</option>
              <option value="false">Sortie</option>
            </select>
          </div>
        </div>
      </div>
      <DataTable data={filteredPointages} columns={columns} />
    </div>
  );
};

export default PointagesTabComponentGrid;
