"use client";
import CustomButton from "@/components/custombutton";
import { Download } from "lucide-react";
import React from "react";
import FileCard from "../../components/file_component";
import ImagesComponent from "../../components/images_component";
import CustomDragDrop from "@/components/dragAndDrop";
import Uploader from "@/components/uploader";

interface ProjectProps {
  project: Project;
}

const DocumentsTab: React.FC<ProjectProps> = ({ project }) => {
  const files = project.files?.filter((file) => file.media?.type !== "image");
  const images = project.files?.filter((file) => file.media?.type === "image");

  const handleFilesAdded = (files: File[]) => {
    console.log("Fichiers ajoutés :", files);
  };

  return (
    <>
      {/* Version Mobile */}
      <div className="sm:hidden flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-base font-semibold text-neutral-950">
            Documents
          </h2>
          <CustomButton
            text="Tout Télécharger"
            icon={<Download className="text-brand-500" />}
            color="bg-neutral-50"
            textColor="text-brand-500"
            onClick={() => {}}
            hover="bg-neutral-100"
          />
        </div>
        {/* Fichiers (non images) */}
        <div className="flex flex-col gap-4">
          {files?.map((file, index) => (
            <FileCard
              key={index}
              fileName={file.media?.name ?? "Fichier sans nom"}
              fileSize=""
              onMoreClick={() =>
                console.log(`More options for ${file.media?.name}`)
              }
              onLinkClick={() =>
                console.log(`Link clicked for ${file.media?.name}`)
              }
            />
          ))}
          <Uploader
            autoProceed
            restrictions={{
              maxNumberOfFiles: 1,
              maxFileSize: 1000000,
              allowedFileTypes: ["image/*"]
            }}
          />
        </div>
        {/* Images */}
        <div className="flex flex-row justify-between items-center mt-4">
          <h2 className="text-base font-semibold text-neutral-950">Médias</h2>
          <CustomButton
            text="Tout Télécharger"
            icon={<Download className="text-brand-500" />}
            color="bg-white"
            textColor="text-brand-500"
            onClick={() => { } } hover={""}          />
        </div>
        <div className="flex flex-col gap-4">
          {images?.map((image, index) => (
            <ImagesComponent
              key={index}
              fileName={image.media?.name ?? "Image sans nom"}
              filePath={image.media?.url ?? ""}
            />
          ))}
          <CustomDragDrop onFilesAdded={handleFilesAdded} />
        </div>
      </div>

      {/* Version Desktop */}
      <div className="hidden sm:flex sm:flex-col gap-6 mt-6">
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
              fileSize=""
              onMoreClick={() =>
                console.log(`More options for ${file.media?.name}`)
              }
              onLinkClick={() =>
                console.log(`Link clicked for ${file.media?.name}`)
              }
            />
          ))}
          <Uploader
            autoProceed
            restrictions={{
              maxNumberOfFiles: 1,
              maxFileSize: 1000000,
              allowedFileTypes: ["image/*"]
            }}
          />
        </div>

        <div className="flex flex-row justify-between items-center mt-6">
          <h2 className="text-paragraphBold text-neutral-950">Médias</h2>
          <CustomButton
            text="Tout Télécharger"
            icon={<Download className="text-brand-500" />}
            color="bg-white"
            textColor="text-brand-500"
            onClick={() => { } } hover={""}          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images?.map((image, index) => (
            <ImagesComponent
              key={index}
              fileName={image.media?.name ?? "Image sans nom"}
              filePath={image.media?.url ?? ""}
            />
          ))}
          <CustomDragDrop onFilesAdded={handleFilesAdded} />
        </div>
      </div>
    </>
  );
};

export default DocumentsTab;
