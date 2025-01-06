import CustomButton from "@/app/components/custombutton";
import { Download } from "lucide-react";
import React from "react";
import FileCard from "../file_component";
import DragDrop from "../drag_file_component";
import ImagesComponent from "../images_component";

interface YardProps {
  yard: Yard;
}

const files = [
  { fileName: "Plan-Maison.pdf", fileSize: "780,76 KB" },
  { fileName: "Rapport-Financier.pdf", fileSize: "1,2 MB" },
  { fileName: "Presentation.pptx", fileSize: "3,4 MB" },
  { fileName: "Code-Source.zip", fileSize: "25 MB" },
  { fileName: "Photo-Vacances.jpg", fileSize: "2,1 MB" }
];

const imageList = [
  {
    id: "1",
    fileName: "yard.jpeg",
    filePath: "/asset/img/yard.jpeg"
  },
  {
    id: "2",
    fileName: "garden.jpeg",
    filePath: "/asset/img/yard.jpeg"
  },
  {
    id: "3",
    fileName: "house.jpeg",
    filePath: "/asset/img/yard.jpeg"
  },
  {
    id: "4",
    fileName: "house.jpeg",
    filePath: "/asset/img/yard.jpeg"
  }
];

const DocumentsTab: React.FC<YardProps> = ({ yard }) => {
  return (
    <div className="mt-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="font-satoshi text-paragraphBold text-neutral-950">
          Documents
        </h2>
        <CustomButton
          text="Tout Télécharger"
          icon={<Download className="text-brand-500" />}
          color="bg-white"
          textColor="text-brand-500"
          onClick={() => {}}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <FileCard
            key={index}
            fileName={file.fileName}
            fileSize={file.fileSize}
            onMoreClick={() => console.log(`More options for ${file.fileName}`)}
            onLinkClick={() => console.log(`Link clicked for ${file.fileName}`)}
          />
        ))}
        <DragDrop onDrop={() => {}} height="h-20" width="w-full" />
      </div>
      <div className="flex flex-row justify-between items-center mt-6">
        <h2 className="font-satoshi text-paragraphBold text-neutral-950 ">
          Médias
        </h2>
        <CustomButton
          text="Tout Télécharger"
          icon={<Download className="text-brand-500 w-" />}
          color="bg-white"
          textColor="text-brand-500"
          onClick={() => {}}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {imageList.map((image, index) => (
          <ImagesComponent
            key={index}
            fileName={image.fileName}
            filePath={image.filePath}
          />
        ))}
        <DragDrop onDrop={() => {}} height="h-56" width="w-full" />
      </div>
    </div>
  );
};

export default DocumentsTab;
