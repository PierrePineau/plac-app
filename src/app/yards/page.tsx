"use client";
import { useYardStore } from "@/store/yardStore";
import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import Header from "../components/header";
import CustomButton from "../components/custombutton";
import { Filter, PlusIcon } from "lucide-react";
import Yard from "../components/yard";
import Popup from "../components/popup";
import Dropdown from "../components/customDropdown";

export default function Chantiers() {
  const { yards, fetchYards, addYard } = useYardStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchYards();
  }, [fetchYards]);

  const handleAddYard = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveYard = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const newYard = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      manager: formData.get("manager") as string,
      status: formData.get("status") as string
    };

    addYard(newYard);
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
                hover={""}
              />
              <CustomButton
                icon={<PlusIcon className="text-white" />}
                text="Ajouter un chantier"
                color="bg-brand-950"
                textColor="text-white"
                onClick={handleAddYard}
                hover={""}
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
        <form className="flex flex-col gap-2" onSubmit={handleSaveYard}>
          <div>
            <label
              htmlFor="name"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Nom du chantier
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Nom du chantier"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="flex min-h-40 p-3 justify-center items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Description"
              required
            />
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <div>
              <label
                htmlFor="startDate"
                className="font-satoshi text-paragraphMedium text-neutral-950">
                Date de début
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                required
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="font-satoshi text-paragraphMedium text-neutral-950">
                Date de fin
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <div>
              <label
                htmlFor="manager"
                className="font-satoshi text-paragraphMedium text-neutral-950">
                Chef de chantier
              </label>
              <input
                type="text"
                id="manager"
                name="manager"
                className="flex h-11 p-3 items-center gap-2 self-stretch w-full min-w-56 border border-neutral-200 rounded"
                required
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
