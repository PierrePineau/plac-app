"use client";
import BubbleText from "@/components/bubbleText";
import CustomButton from "@/components/custombutton";
import { File, Plus, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import NoteCard from "../../components/note_component";
import Popup from "@/components/popup";
import CreateOrModifyNotes from "../../components/createOrModifyNotes";
import SearchBar from "@/app/(app)/components/searchBar";
import NewNote from "../../components/modals/newNotes";
import { useNoteStore } from "@/store/user/noteStore";
import Btn from "@/components/btn";

const NotesGrid: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { fetchData, data } = useNoteStore();

  useEffect(() => {
    const getNotes = async () => {
      await fetchData("");
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
    <>
      {/* Version Mobile */}
      <div className="sm:hidden flex flex-col gap-4">
        <div className="flex flex-row justify-between items-end">
          <div className="w-1/2">
            <SearchBar
              label="Rechercher une note"
              placeholder="Rechercher"
              onChange={(e: string) => setSearch(e)}
            />
          </div>
          <NewNote title={""} />
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
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
            <p className="text-sm">Aucune note trouvée</p>
          )}
        </div>
        <div className="flex justify-center items-center">
          <Btn variant="light">Plus de notes</Btn>
        </div>
      </div>

      {/* Version Desktop */}
      <div className="hidden sm:flex flex-col gap-4">
        <div className="flex flex-row justify-between items-end">
          <div>
            <SearchBar
              label="Rechercher un utilisateur"
              placeholder="Rechercher"
              onChange={(e: string) => setSearch(e)}
            />
          </div>
          <NewNote title={"Ajouter une note"} />
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
          <Btn variant="light">Plus de notes</Btn>
        </div>
      </div>

      {/* Popup de création/modification de note (commun) */}
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Ajouter une note">
        <CreateOrModifyNotes
          onSubmit={() => {}}
          submitLabel="Ajouter la note"
        />
      </Popup>
    </>
  );
};

export default NotesGrid;
