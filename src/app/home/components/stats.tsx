import BubbleText from "@/app/components/bubbleText";
import { Users } from "lucide-react";

export default function Stats({ title, value }: StatsProps): JSX.Element {
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
        <p className="text-paragraphMedium text-neutral-400 font-satoshi">
          {title}
        </p>
        <p className="text-neutral-950 font-bold font-satoshi text-stat">
          {value}
        </p>
      </div>
    </div>
  );
}
