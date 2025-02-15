import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
  unreadCount?: number; // Paramètre optionnel pour le nombre de notifications non lues
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b border-neutral-400 text-neutral-400 text-paragraphMedium  ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex gap-2 relative px-4 py-2 ${
              activeTab === index
                ? "border-b-2 border-neutral-950 text-neutral-950"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab(index)}>
            {tab.label}
            {tab.unreadCount !== undefined && tab.unreadCount > 0 && (
              <span className=" bg-red-500 text-white   text-sm font-bold rounded-lg px-1 py-0.5">
                {tab.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
