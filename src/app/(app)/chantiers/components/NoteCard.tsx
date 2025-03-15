"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import BubbleText from "@/components/BubbleText";
import CustomButton from "@/components/CustomButton";
import { File, MoreHorizontal, Edit, Trash } from "lucide-react";
import Popup from "@/components/Popup";
import { useState } from "react";

type NoteProps = {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
};

const NoteCard: React.FC<NoteProps> = ({ id, name, content, createdAt }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleViewNotes = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  const handleEditNote = () => {
    console.log("Modifier la note", id);
    // Logique pour modifier la note
  };

  const handleDeleteNote = () => {
    console.log("Supprimer la note", id);
    // Logique pour supprimer la note
  };

  const formattedDate = createdAt.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  const formattedTime = createdAt.toLocaleString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4 gap-2 flex flex-col justify-between relative">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col justify-center">
          <BubbleText
            icon={<File />}
            widthBubble="w-12"
            heightBubble="h-12"
            widthSubBubble="w-10"
            heightSubBubble="h-10"
          />
          <h3 className="  text-h3Desktop text-neutral-950">
            {name}
          </h3>
        </div>

        {/* Menu avec Radix UI */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="text-neutral-950 focus:outline-none">
              <MoreHorizontal />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white shadow-lg border border-neutral-200 rounded-lg w-40 py-2 z-50"
              align="end"
              sideOffset={8}>
              <DropdownMenu.Item
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 cursor-pointer"
                onSelect={handleEditNote}>
                <Edit className="w-4 h-4 mr-2" /> Modifier
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 cursor-pointer"
                onSelect={handleDeleteNote}>
                <Trash className="w-4 h-4 mr-2" /> Supprimer
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <p className="  text-neutral-400 text-paragraphMedium">
        {content}
      </p>

      <div className="flex justify-between items-center   text-tag text-neutral-400">
        <span>{`${formattedDate} - ${formattedTime}`}</span>
        <CustomButton
          text={"Voir plus"}
          color={"bg-neutral-50"}
          textColor={"text-brand-500"}
          hover={"bg-neutral-100"}
          onClick={handleViewNotes}
        />
      </div>

      {/* Popup de visualisation */}
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} title={name}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
            defaultValue={content}
            required
            disabled
          />
        </div>
      </Popup>
    </div>
  );
};

export default NoteCard;
