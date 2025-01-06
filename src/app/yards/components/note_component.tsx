import BubbleText from "@/app/components/bubbleText";
import { File, MoreHorizontal } from "lucide-react";

const NoteCard: React.FC<Note> = ({ title, description, date, time }) => (
  <div className="bg-white border border-neutral-200 rounded-lg p-4 gap-2 flex flex-col justify-between">
    <div className="flex flex-row justify-between">
      <div className="flex flex-col justify-center">
        <BubbleText
          icon={<File />}
          widthBubble="w-12"
          heightBubble="h-12"
          widthSubBubble="w-10"
          heightSubBubble="h-10"
        />
        <h3 className="font-satoshi text-h3Desktop text-neutral-950">
          {title}
        </h3>
      </div>
      <MoreHorizontal className="text-neutral-950" />
    </div>
    <p className="font-satoshi text-neutral-400 text-paragraphMedium">
      {description}
    </p>
    <div className="flex justify-between items-center font-satoshi text-tag text-neutral-400">
      <span>{`${date} - ${time}`}</span>
      <a
        href="#"
        className="text-brand-500 font-satoshi text-button hover:underline">
        Voir plus
      </a>
    </div>
  </div>
);

export default NoteCard;
