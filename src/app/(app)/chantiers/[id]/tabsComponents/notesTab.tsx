"use client";
import BubbleText from "@/components/bubbleText";
import CustomButton from "@/components/custombutton";
import { File, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import NoteCard from "../../components/note_component";
import Popup from "@/components/popup";
import CreateOrModifyNotes from "../../components/createOrModifyNotes";
import SearchBar from "@/app/(app)/components/searchBar";
import NewNote from "../../components/modals/newNotes";
import { useNoteStore } from "@/store/user/noteStore";

const NotesGrid: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { fetchData, data } = useNoteStore();

  useEffect(() => {
    const getNotes = async () => {
      const data = await fetchData("");
    };
    getNotes();
  }, [fetchData]);

  const handleCreateNotes = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  const filteredNotes = data.filter((note) =>
    note.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-end">
        <div>
          <SearchBar
            label="Rechercher un utilisateur"
            placeholder="Rechercher"
            onChange={(e: string) => setSearch(e)}
          />
        </div>
        <NewNote />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length !== 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              name={note.name!}
              content={note.content!}
              createdAt={note.createdAt!}
            />
          ))
        ) : (
          <p>Aucune note trouvée</p>
        )}
      </div>
      <div className="flex justify-center items-center">
        <CustomButton
          text="Charger plus de note"
          onClick={() => {}}
          color="bg-neutral-50"
          textColor="text-neutral-950"
          border="border border-neutral-200"
          hover="bg-neutral-100"
        />
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

export default NotesGrid;
