import BubbleText from "@/app/components/bubbleText";
import CustomButton from "@/app/components/custombutton";
import { File, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import SearchBar from "@/app/components/searchBar";
import Popup from "@/app/components/popup";
import EndOfSheetCard from "../../components/viewEndOfSheet";

const EndOfSheetsTabComponentGrid: React.FC<{ endOfSheets: EndOfSheet[] }> = ({
  endOfSheets
}) => {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCreateNotes = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-end">
        <div className="">
          <SearchBar
            label="Rechercher un utilisateur"
            placeholder="Rechercher"
            onChange={(e: string) => setSearch(e)}
          />
        </div>

        <CustomButton
          text="Ajouter une fiche à l'employé"
          icon={<PlusIcon />}
          color="bg-neutral-50"
          textColor="text-neutral-950"
          border="border border-neutral-200"
          onClick={handleCreateNotes}
          hover={"bg-brand-100"}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {endOfSheets.length != 0 &&
          endOfSheets.map((endOfSheet) => (
            <EndOfSheetCard
              key={endOfSheet.id}
              id={endOfSheet.id}
              name={endOfSheet.title!}
              content={endOfSheet.content!}
              createdAt={endOfSheet.createdAt}
            />
          ))}
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Ajouter une fiche"
        desc="Vous pouvez ajouter une fiche de fin de journée si elle n’a pas été faite.">
        <form className="flex flex-col gap-2" onSubmit={() => {}}>
          <div>
            <label
              htmlFor="name"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Employé
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded font-satoshi text-paragraphMedium text-neutral-950"
              placeholder="Paul dupont"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Titre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded font-satoshi text-paragraphMedium text-neutral-950"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="font-satoshi text-paragraphMedium text-neutral-950">
              Description
            </label>
            <textarea
              id="name"
              name="name"
              className="flex p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded font-satoshi text-paragraphMedium text-neutral-950 resize-y"
              required
              rows={6}
            />
          </div>
          <div className="flex flex-row gap-2 items-end justify-end">
            <button
              type="submit"
              className="bg-neutral-50 text-neutral-950 font-satoshi text-paragraphRegular px-4 py-2 rounded-md hover:bg-neutral-100">
              Annuler
            </button>
            <button
              type="submit"
              className="bg-brand-950 text-white font-satoshi text-paragraphRegular px-4 py-2 rounded-md hover:bg-brand-700">
              Ajouter la fiche
            </button>
          </div>
        </form>
      </Popup>
    </div>
  );
};

export default EndOfSheetsTabComponentGrid;
