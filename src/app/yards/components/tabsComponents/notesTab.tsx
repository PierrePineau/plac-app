import BubbleText from "@/app/components/bubbleText";
import CustomButton from "@/app/components/custombutton";
import { File, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import NoteCard from "../note_component";
import SearchBar from "@/app/components/searchBar";

// Composant principal NotesGrid
const NotesGrid: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-start items-start">
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
          onClick={() => {}}
          hover={"bg-brand-1000"}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            name={note.name}
            content={note.content}
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
    </div>
  );
};

export default NotesGrid;
