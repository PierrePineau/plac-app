// Popup.tsx
import { Cross, X } from "lucide-react";
import React, { ReactNode } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc?: string;
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
  desc
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-start pb-4">
          <div className="flex flex-col">
            <h2 className="font-satoshi text-h2Desktop text-neutral-950">
              {title}
            </h2>
            {desc && (
              <p className="font-satoshi text-paragraphMedium text-neutral-400">
                {desc}
              </p>
            )}
          </div>
          <button onClick={onClose}>
            <X className="text-neutral-950 w-6 h-6" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
