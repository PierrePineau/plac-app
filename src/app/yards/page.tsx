// Chantiers.tsx
"use client";

import React, { useState } from "react";
import CustomButton from "../components/custombutton";
import Header from "../components/header";
import NavBar from "../components/navBar";
import Yard from "../components/yard";
import "../globals.css";
import { Filter, PlusIcon } from "lucide-react";
import Popup from "../components/popup";
import Dropdown from "../components/customDropdown";

const yards = [
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
  }
];

export default function Chantiers() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddYard = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
                onClick={handleAddYard}
              />
            </div>
          </div>
          <Yard yards={yards} />
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Ajouter un chantier"
        desc="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum">
        <form className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="name"
              className=" font-satoshi text-paragraphMedium text-neutral-950">
              Nom du chantier
            </label>
            <input
              type="text"
              id="name"
              className=" flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Nom du chantier"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className=" font-satoshi text-paragraphMedium text-neutral-950">
              Description
            </label>
            <textarea
              id="description"
              className="flex min-h-40 p-3 justify-center items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <div>
              <label
                htmlFor="name"
                className=" font-satoshi text-paragraphMedium text-neutral-950">
                Date de début
              </label>
              <input
                type="date"
                id="name"
                className=" flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                placeholder="Date de début"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className=" font-satoshi text-paragraphMedium text-neutral-950">
                Date de fin
              </label>
              <input
                type="date"
                id="name"
                className=" flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                placeholder="Date de fin"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <div>
              <label
                htmlFor="name"
                className=" font-satoshi text-paragraphMedium text-neutral-950">
                Chef de chantier
              </label>
              <input
                type="text"
                id="name"
                className=" flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                placeholder="Chef de chantier"
              />
            </div>
            <div>
              <Dropdown
                label="Status"
                options={["test", "test2", "test3"]}
                maxWidth="min-w-56"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-brand-950 text-white px-4 py-2 rounded-md hover:bg-brand-700">
            Enregistrer
          </button>
        </form>
      </Popup>
    </div>
  );
}
