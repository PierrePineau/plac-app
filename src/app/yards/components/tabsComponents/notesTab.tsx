import BubbleText from "@/app/components/bubbleText";
import CustomButton from "@/app/components/custombutton";
import { File, PlusIcon } from "lucide-react";
import React from "react";
import NoteCard from "../note_component";

// Composant principal NotesGrid
const NotesGrid: React.FC<{ notes: Note[] }> = ({ notes }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-end">
        <CustomButton
          text="Ajouter une note"
          icon={<PlusIcon />}
          color="bg-brand-950"
          textColor="text-white"
          onClick={() => {}}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
            date={note.date}
            time={note.time}
          />
        ))}
      </div>
      <div className="flex justify-center item-center">
        <CustomButton
          text="Charger plus de note"
          onClick={() => {}}
          color="bg-white"
          textColor="text-neutral-950"
          border="border border-neutral-200"
        />
      </div>
    </div>
  );
};

export default NotesGrid;
