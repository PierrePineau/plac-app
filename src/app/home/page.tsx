"use client";
import Dropdown from "../components/customDropdown";
import DataTable from "../components/customTab";
import Header from "../components/header";
import NavBar from "../components/navBar";
import SearchBar from "../components/searchBar";
import Stats from "./components/stats";
import Yard from "../components/yard";
import "../globals.css";
import CustomButton from "../components/custombutton";
import { ListRestart } from "lucide-react";
import Popup from "../components/popup";
import { useState } from "react";

type TableData = {
  user: string;
  number: string;
  date: string;
  content?: string; // Peut être optionnel selon les colonnes utilisées
  status?: string; // Peut être optionnel selon les colonnes utilisées
};

// Données pour le tableau
const yards: Yard[] = [
  {
    id: 1,
    reference: "Y001",
    code: 1001,
    name: "Yard Alpha",
    description: "Main yard in Alpha City",
    address: "123 Alpha St, Alpha City",
    archived: false,
    deleted: false,
    client: "Client A",
    medias: ["media1.jpg"],
    files: "file1.pdf"
  },
  {
    id: 2,
    reference: "Y002",
    code: 1002,
    name: "Yard Beta",
    description: "Secondary yard in Beta City",
    address: "456 Beta Ave, Beta City",
    archived: false,
    deleted: false,
    client: "Client B",
    medias: ["media1.jpg"],
    files: "file2.pdf"
  }
];

const mockNotes: Note[] = [
  {
    id: 1,
    title: "Note 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ligula quam, gravida sed ultrices eget, hendrerit eget n...",
    date: "Hier",
    time: "11h51"
  },
  {
    id: 2,
    title: "Note 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ligula quam, gravida sed ultrices eget, hendrerit eget n...",
    date: "Hier",
    time: "11h51"
  },
  {
    id: 3,
    title: "Note 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ligula quam, gravida sed ultrices eget, hendrerit eget n...",
    date: "Hier",
    time: "11h51"
  }
];

const users: Employe[] = [
  {
    id: 1,
    lastName: "Doe",
    firstName: "John",
    avatar: "/asset/img/avatar.svg",
    email: "johndoe@gmail.com",
    phone: "06 21 45 38 76",
    address: "123 Alpha St, Alpha City",
    role: "client",
    enable: "true",
    note: mockNotes
  },
  {
    id: 2,
    lastName: "Doe",
    firstName: "Jason",
    avatar: "/asset/img/avatar.svg",
    email: "jasondoe@gmail.com",
    phone: "06 21 46 38 76",
    address: "123 Alpha St, Alpha City",
    role: "client",
    enable: "true",
    note: mockNotes
  }
];

const options = ["Option 1", "Option 2", "Option 3"];

const data: TableData[] = [
  {
    user: "John Doe",
    number: "12345",
    date: "2024-12-09",
    content: "Rapport de chantier terminé"
  },
  {
    user: "Jane Smith",
    number: "67890",
    date: "2024-12-08",
    content: "Inspection partielle réalisée"
  },
  {
    user: "Alice Johnson",
    number: "54321",
    date: "2024-12-07",
    content: "Travaux en attente"
  }
];

const dataEndOfYear: TableData[] = [
  {
    user: "John Doe",
    number: "12345",
    date: "2024-12-09",
    status: "Entrée"
  },
  {
    user: "Jane Smith",
    number: "67890",
    date: "2024-12-08",
    status: "Sortie"
  },
  {
    user: "Alice Johnson",
    number: "54321",
    date: "2024-12-07",
    status: "Entrée"
  }
];

const columns = [
  {
    accessorKey: "name",
    header: "Utilisateurs",
    cell: (info: any) => {
      const { avatar, firstName, lastName, email } = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <img className="w-auto h-8" src={avatar} alt="Logo Plac" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">
              {firstName} {lastName}
            </p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
      );
    }
  }
];

export default function Home() {
  const handleRowSelectionChange = (selectedRows: TableData[]) => {
    console.log("Selected Rows:", selectedRows);
  };
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-row bg-white h-full">
      <div className="sticky bg-white hidden md:block border-r border-neutral-200">
        <NavBar />
      </div>

      <div className="flex flex-col w-full">
        <div className="top-0 bg-white z-10 border-b border-neutral-200">
          <Header />
        </div>
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-col">
            <p className="text-h1Desktop text-neutral-950 font-satoshi">
              Bonjour
            </p>
            <p className="text-paragraphMedium font-satoshi text-neutral-400">
              Lorem ipsum
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Stats title="Total d'utilisateur" value={1910} />
            <Stats title="Total d'utilisateur" value={1910} />
            <Stats title="Total d'utilisateur" value={1910} />
          </div>
          <p className="text-h2Desktop font-satoshi text-neutral-950">
            Mes derniers chantiers
          </p>
          <Yard yards={yards} />
          <div>
            <p className="text-h2Desktop font-satoshi text-neutral-950">
              Fiches de Fin de Journée
            </p>
            <p className="text-paragraphMedium font-satoshi text-neutral-400">
              Lorem ipsum
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <SearchBar
                label="Rechercher un utilisateur"
                placeholder="Rechercher"
                onChange={(e: string) => setSearch(e)}
              />
              <Dropdown label="Statut" options={options} />
            </div>
            <div className="mt-6">
              <CustomButton
                text="Réinitialiser les filtres"
                icon={<ListRestart className="text-neutral-950" />}
                color="bg-white"
                textColor="text-neutral-950"
                border="border border-neutral-200 h-12"
                onClick={() => {}}
                hover=""
              />
            </div>
          </div>
          <DataTable
            data={users.filter((user) =>
              user.firstName.toLowerCase().includes(search.toLowerCase())
            )}
            columns={columns}
          />
          <div>
            <p className="text-h2Desktop font-satoshi text-neutral-950">
              Listes des pointages
            </p>
            <p className="text-paragraphMedium font-satoshi text-neutral-400">
              Lorem ipsum
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <SearchBar
                label="Rechercher un utilisateur"
                placeholder="Rechercher"
                onChange={(e: string) => setSearch(e)}
              />
              <Dropdown label="Statut" options={options} />
            </div>
            <div className="mt-6">
              <CustomButton
                text="Réinitialiser les filtres"
                icon={<ListRestart className="text-neutral-950" />}
                color="bg-white"
                textColor="text-neutral-950"
                border="border border-neutral-200 h-12"
                onClick={() => {}}
                hover=""
              />
            </div>
          </div>

          <DataTable
            data={users.filter((user) =>
              user.firstName.toLowerCase().includes(search.toLowerCase())
            )}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}
