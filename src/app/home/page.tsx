"use client";
import Dropdown from "../components/customDropdown";
import DataTable from "../components/customTab";
import Header from "../components/header";
import NavBar from "../components/navBar";
import SearchBar from "../components/searchBar";
import Stats from "./components/stats";
import Yard from "./components/yard";

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
    medias: "media1.jpg",
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
    medias: "media2.jpg",
    files: "file2.pdf"
  },
  {
    id: 3,
    reference: "Y002",
    code: 1002,
    name: "Yard Beta",
    description: "Secondary yard in Beta City",
    address: "456 Beta Ave, Beta City",
    archived: false,
    deleted: false,
    client: "Client B",
    medias: "media2.jpg",
    files: "file2.pdf"
  }
];

type EndOfDayRecord = {
  id: number;
  siteName: string;
  date: string;
  hoursWorked: number;
  status: string;
};

const options = ["Option 1", "Option 2", "Option 3"];

// Utilisation du composant DataTable
const data = [
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

const columns = [
  {
    accessorKey: "user",
    header: "Utilisateurs"
  },
  {
    accessorKey: "number",
    header: "Numéro"
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info: any) =>
      new Date(info.getValue() as string).toLocaleDateString(),
    enableSorting: true
  },
  {
    accessorKey: "content",
    header: "Contenu"
  }
];

export default function Home() {
  const handleRowSelectionChange = (selectedRows: typeof data) => {
    console.log("Selected Rows:", selectedRows);
  };
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
              />
              <Dropdown label="Statut" options={options} />
            </div>
            <div></div>
          </div>
          <DataTable
            data={data}
            columns={columns}
            onRowSelectionChange={handleRowSelectionChange}
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
              />
              <Dropdown label="Statut" options={options} />
            </div>
            <div></div>
          </div>
          <DataTable
            data={data}
            columns={columns}
            onRowSelectionChange={handleRowSelectionChange}
          />
        </div>
      </div>
    </div>
  );
}
