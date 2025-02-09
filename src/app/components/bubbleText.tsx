interface BubbleProps {
  icon: React.ReactNode;
  widthBubble: string;
  heightBubble: string;
  widthSubBubble: string;
  heightSubBubble: string;
  firstBackground?: string;
  secondBackground?: string;
}

const BubbleText: React.FC<BubbleProps> = (bubble) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${bubble.widthBubble} ${bubble.heightBubble} ${bubble.firstBackground ?? "bg-brand-50"} `}>
      <div
        className={`flex items-center justify-center rounded-full ${bubble.widthSubBubble} ${bubble.heightSubBubble} ${bubble.secondBackground ?? "bg-brand-200"}`}>
        {bubble.icon}
      </div>
    </div>
  );
};

export default BubbleText;
