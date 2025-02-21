import BubbleText from "@/components/bubbleText";
import { ArrowUpRight, Users } from "lucide-react";

export default function Stats({
  title,
  value,
  redirectText,
  onClick
}: StatsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-6 border rounded-lg p-6">
      <BubbleText
        icon={<Users className="text-neutral-950" />}
        widthBubble="w-20"
        heightBubble="h-20"
        widthSubBubble="w-16"
        heightSubBubble="h-16"
      />
      <div>
        <p className="text-paragraphMedium text-neutral-400  ">
          {title}
        </p>
        <p className="text-neutral-950 font-bold   text-stat">
          {value}
        </p>
        <button onClick={onClick}>
          <div className="flex flex-row gap-2">
            <ArrowUpRight className="text-brand-500" />
            <p className="text-brand-500   text-paragraphMedium">
              {redirectText}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
