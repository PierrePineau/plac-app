"use client";
import BubbleText from "@components/bubbleText";
import { ArrowUpRight, Users } from "lucide-react";

interface StatsProps {
  title: string;
  value: number;
  redirectText: string;
  onClick: () => void;
}

export default function Stats({
  title,
  value,
  redirectText,
  onClick
}: StatsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 border rounded-lg p-4 sm:p-6">
      <BubbleText
        icon={<Users className="text-neutral-950" />}
        widthBubble="w-16 sm:w-20"
        heightBubble="h-16 sm:h-20"
        widthSubBubble="w-12 sm:w-16"
        heightSubBubble="h-12 sm:h-16"
      />
      <div>
        <p className="text-sm sm:text-paragraphMedium text-neutral-400">
          {title}
        </p>
        <p className="text-neutral-950 font-bold text-xl sm:text-stat">
          {value}
        </p>
        <button onClick={onClick}>
          <div className="flex flex-row gap-1 sm:gap-2 items-center">
            <ArrowUpRight className="text-brand-500" />
            <p className="text-brand-500 text-sm sm:text-paragraphMedium">
              {redirectText}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
