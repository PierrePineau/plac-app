interface BubbleProps {
  icon: React.ReactNode;
}

const BubbleText: React.FC<BubbleProps> = (bubble) => {
  return (
    <div className="flex items-center justify-center rounded-full w-20 h-20 bg-brand-50">
      <div className="flex items-center justify-center rounded-full w-16 h-16 bg-brand-200">
        {bubble.icon}
      </div>
    </div>
  );
};

export default BubbleText;
