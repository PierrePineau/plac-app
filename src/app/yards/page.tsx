"use client";
import CustomButton from "../components/custombutton";
import Header from "../components/header";
import NavBar from "../components/navBar";
import Yard from "../components/yard";
import "../globals.css";
import { Filter, PlusIcon } from "lucide-react";

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

export default function Chantiers() {
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
          <div className="flex flex-row justify-between">
            <p className="text-h1Desktop text-neutral-950 font-satoshi">
              Mes chantiers
            </p>
            <div className="flex flex-row">
              <CustomButton
                icon={<Filter className="text-neutral-950" />}
                text="Filtrer"
                color="bg-white"
                textColor="text-neutral-950"
                onClick={() => {}}
              />
              <CustomButton
                icon={<PlusIcon className="text-white" />}
                text="Ajouter un chantier"
                color="bg-brand-950"
                textColor="text-white"
                onClick={() => {}}
              />
            </div>
          </div>
          <Yard yards={yards} />
        </div>
      </div>
    </div>
  );
}
