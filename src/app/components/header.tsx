import { Bell } from "lucide-react";
import SearchBar from "./searchBar";
import Popup from "./popup";
import { useState } from "react";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenNotif = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div className="justify-start bg-white px-8 py-5">
      <div className="flex flex-row justify-between items-center">
        <div className="w-searchBarWidth">
          <SearchBar placeholder="Rechercher" />
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <button onClick={handleOpenNotif}>
            <Bell className="text-black" />
          </button>
          <img
            className="w-auto h-8"
            src="/asset/img/avatar.svg"
            alt="Logo Plac"
          />
          <div className="flex flex-col items-start">
            <p className="text-paragraphBold text-neutral-900">Jean Martin</p>
            <p className="text-tag text-neutral-400">jeanmartin@gmail.com</p>
          </div>
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
