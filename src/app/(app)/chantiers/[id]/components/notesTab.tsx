"use client";
import BubbleText from "@components/bubbleText";
import CustomButton from "@components/custombutton";
import { PlusIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import NoteCard from "../../components/note_component";
import Popup from "@components/popup";
import CreateOrModifyNotes from "../../components/createOrModifyNotes";
import SearchBar from "@/app/(app)/components/SearchBar";
import NewNote from "../../components/modals/newNotes";
import { useNoteStore } from "@/store/user/noteStore";
import Btn from "@components/btn";
import Field from "@components/field";

const NotesGrid: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { fetchData, data } = useNoteStore();

  useEffect(() => {
    fetchData("");
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
          <div className="w-full sm:w-1/2">
            <Field
              label="Rechercher une note"
              name="search"
              placeholder="Rechercher une note"
              startContent={<SearchIcon />}
              />
          </div>
          <div className="mt-2 sm:mt-0">
            <NewNote title="Ajouter une note" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredNotes.length > 0 ? (
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
