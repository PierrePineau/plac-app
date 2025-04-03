"use client";
import React, { use, useState } from "react";
import {Tabs as HeroUiTabs, Tab as HeroUiTab} from "@heroui/tabs";

interface Tab {
  label: string;
  href?: string; // Paramètre optionnel pour le lien de la tab
  content: React.ReactNode;
  unreadCount?: number; // Paramètre optionnel pour le nombre de notifications non lues
}

interface TabsProps {
  tabs: Tab[];
}

// const Tabs: React.FC<TabsProps> = ({ tabs }) => {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <div>
//       <div className="flex border-b border-neutral-400 text-neutral-400 text-paragraphMedium  ">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             className={`flex gap-2 relative px-4 py-2 ${
//               activeTab === index
//                 ? "border-b-2 border-neutral-950 text-neutral-950"
//                 : "text-neutral-400"
//             }`}
//             onClick={() => setActiveTab(index)}>
//             {tab.label}
//             {tab.unreadCount !== undefined && tab.unreadCount > 0 && (
//               <span className=" bg-red-500 text-white   text-sm font-bold rounded-lg px-1 py-0.5">
//                 {tab.unreadCount}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>
//       <div className="mt-4">{tabs[activeTab].content}</div>
//     </div>
//   );
// };

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  // const [activeTab, setActiveTab] = useState(0);
  return (
    // <div className="flex border-b border-neutral-400 text-neutral-400 text-paragraphMedium  ">
    <div className="flex flex-col w-full gap-4">
      <HeroUiTabs
        aria-label="Tabs"
        variant={"underlined"}
        className="w-full relative z-10"
        classNames={{
          tabList: "gap-0 w-full relative rounded-none p-0 after:absolute after:content-[''] after:bg-neutral-300 after:h-[2px] after:w-full after:z-0 after:bottom-0",
          cursor: "w-full",
          tab: "max-w-fit px-4 py-0 h-12 relative z-10",
        }}
        >
          {tabs.map((tab, index) => (
            <HeroUiTab key={index} title={tab.label}>
              {tab.content}
            </HeroUiTab>
          ))}
        </HeroUiTabs>
    </div>
  );
};

export default Tabs;
