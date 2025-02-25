import CustomButton from "@/components/custombutton";
import { Download } from "lucide-react";
import React from "react";
import FileCard from "../../components/file_component";
import DragDrop from "../../components/drag_file_component";
import ImagesComponent from "../../components/images_component";

interface ProjectProps {
  project: Project;
}

const DocumentsTab: React.FC<ProjectProps> = ({ project }) => {
  // Séparer les fichiers et les images
  const files = project.files?.filter(file => file.media?.type !== "image");
  const images = project.files?.filter(file => file.media?.type === "image");

  return (
    <div className="mt-6">
      {/* Section Documents */}
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-paragraphBold text-neutral-950">Documents</h2>
        <CustomButton
          text="Tout Télécharger"
          icon={<Download className="text-brand-500" />}
          color="bg-neutral-50"
          textColor="text-brand-500"
          onClick={() => {}}
          hover="bg-neutral-100"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {files?.map((file, index) => (
          <FileCard
            key={index}
            fileName={file.media?.name ?? "Fichier sans nom"}
            fileSize={""}
            onMoreClick={() => console.log(`More options for ${file.media?.name}`)}
            onLinkClick={() => console.log(`Link clicked for ${file.media?.name}`)}
          />
        ))}
        <DragDrop onDrop={() => {}} height="h-20" width="w-full" />
      </div>

      {/* Section Médias */}
      <div className="flex flex-row justify-between items-center mt-6">
        <h2 className="text-paragraphBold text-neutral-950">Médias</h2>
        <CustomButton
          text="Tout Télécharger"
          icon={<Download className="text-brand-500" />}
          color="bg-white"
          textColor="text-brand-500"
          onClick={() => {}}
          hover=""
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images?.map((image, index) => (
          <ImagesComponent
            key={index}
            fileName={image.media?.name ?? "Image sans nom"}
            filePath={image.media?.url ?? ""}
          />
        ))}
        <DragDrop onDrop={() => {}} height="h-56" width="w-full" />
      </div>
    </div>
  );
};

export default DocumentsTab;
