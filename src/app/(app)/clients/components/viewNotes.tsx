"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import BubbleText from "@/components/BubbleText";
import CustomButton from "@/components/CustomButton";
import { File, MoreHorizontal, Edit, Trash } from "lucide-react";
import Popup from "@/components/Popup";
import { useState } from "react";

type NotesProps = {
  id: number;
  name: string;
  content: string;
  createdAt: Date | string;
};

const NotesCard: React.FC<NotesProps> = ({ id, name, content, createdAt }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleViewNotes = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
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
            icon={<File className="text-brand-500" />}
            widthBubble="w-12"
            heightBubble="h-12"
            widthSubBubble="w-10"
            heightSubBubble="h-10"
          />
          <h3 className="  text-h3Desktop text-neutral-950">
            {name}
          </h3>
        </div>
      </div>

      <p
        className="  text-neutral-400 text-paragraphMedium overflow-hidden text-ellipsis"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}>
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
        <div className="p-4 flex flex-col justify-start">
          <div className="border border-neutral-200 rounded bg-neutral-50 p-4">
            <p className="text-neutral-950 text-paragraphMedium   leading-relaxed whitespace-normal">
              {content}
            </p>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default NotesCard;
