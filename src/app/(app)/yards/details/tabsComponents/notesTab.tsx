import BubbleText from "@/components/bubbleText";
import CustomButton from "@/components/custombutton";
import { File, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import NoteCard from "../../components/note_component";
import SearchBar from "@/components/searchBar";
import Popup from "@/components/popup";
import CreateOrModifyNotes from "../../components/createOrModifyNotes";

// Composant principal NotesGrid
const NotesGrid: React.FC<{ notes: Note[] }> = ({ notes }) => {
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

  const filteredNotes = notes.filter((note) =>
    note.name?.toLowerCase().includes(search.toLowerCase())
  );

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
          text="Ajouter une note"
          icon={<PlusIcon />}
          color="bg-brand-950"
          textColor="text-white"
          onClick={handleCreateNotes}
          hover={"bg-brand-1000"}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length != 0 &&
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              name={note.name!}
              content={note.content!}
              createdAt={note.createdAt}
            />
          ))}
      </div>
      <div className="flex justify-center item-center">
        <CustomButton
          text="Charger plus de note"
          onClick={() => {}}
          color="bg-neutral-50"
          textColor="text-neutral-950"
          border="border border-neutral-200"
          hover={"bg-neutral-100"}
        />
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Ajouter une note">
        <CreateOrModifyNotes
          onSubmit={() => {}}
          submitLabel={"Ajouter la note"}
        />
      </Popup>
    </div>
  );
};

export default NotesGrid;
