interface BubbleProps {
  icon: React.ReactNode;
  widthBubble: string;
  heightBubble: string;
  widthSubBubble: string;
  heightSubBubble: string;
}

const BubbleText: React.FC<BubbleProps> = (bubble) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${bubble.widthBubble} ${bubble.heightBubble} bg-brand-50`}>
      <div
        className={`flex items-center justify-center rounded-full ${bubble.widthSubBubble} ${bubble.heightSubBubble} bg-brand-200`}>
        {bubble.icon}
      </div>
    </div>
  );
};

export default BubbleText;
