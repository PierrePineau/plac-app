"use client";
import React, { useState } from "react";
import CustomButton from "@components/custombutton";
import { PlusIcon } from "lucide-react";
import NotesCard from "../../components/viewNotes";
import Popup from "@components/popup";
import CreateOrModifyNotes from "@/app/(app)/chantiers/components/createOrModifyNotes";
import SearchBar from "@/app/(app)/components/searchBar";

const NotesTabComponentGrid: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleAddNotes = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  const filteredNotes = notes.filter((note) =>
    note.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div className="w-full sm:w-1/2">
          <SearchBar
            label="Rechercher une note"
            placeholder="Rechercher"
            onChange={(e: string) => setSearch(e)}
          />
        </div>
        <CustomButton
          text="Ajouter une note"
          icon={<PlusIcon />}
          color="bg-neutral-50"
          textColor="text-neutral-950"
          border="border border-neutral-200"
          onClick={handleAddNotes}
          hover="bg-brand-100"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes && filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NotesCard
              key={note.id}
              id={note.id}
              name={note.name!}
              content={note.content!}
              createdAt={note.createdAt}
            />
          ))
        ) : (
          <p className="text-sm">Aucune note trouvée</p>
        )}
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Ajouter une note">
        <CreateOrModifyNotes
          onSubmit={() => {}}
          submitLabel="Ajouter la note"
        />
      </Popup>
    </div>
  );
};

export default NotesTabComponentGrid;
