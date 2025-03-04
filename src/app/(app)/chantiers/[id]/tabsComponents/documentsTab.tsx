"use client";
import CustomButton from "@/components/custombutton";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import FileCard from "../../components/file_component";
import Uploader from "@/components/uploader";
import { useFileStore, useMediaStore } from "@/store/user/fileStore";
import Spinner from "@/components/spinner";
import { CardFile, CardMedia } from "@/components/card";
import Btn from "@/components/btn";

interface ProjectProps {
  project: Project;
}

const DocumentsTab: React.FC<ProjectProps> = ({ project }) => {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isLoadingMedias, setIsLoadingMedias] = useState(false);
  const { data: dataFiles, fetchData: fetchDataFiles } = useFileStore();
  const { data: dataMedias, fetchData: fetchDataMedias } = useMediaStore();

	const handleFilesAdded = (files: Files[]) => {
		let newImage = files.filter((file) => file.type.includes("MEDIA"));
		let newFile = files.filter((file) => !file.type.includes("MEDIA"));

		// On va récupe les fichiers ajoutés et les envoyer au serveur
		// TODO : Ajouter directement au store ?
		if (newImage.length > 0) {
			fetchDataMedias({
				type: "MEDIA",
			});
		}
		if (newFile.length > 0) {
			fetchDataFiles({
				type: "FILE",
			});
		}
	};

	useEffect(() => {
		setEndpointFiles(`/api/app/organisations/{idOrganisation}/projects/${project.id}/files`);
		setEndpointMedias(`/api/app/organisations/{idOrganisation}/projects/${project.id}/files`);
	}, []);

	useEffect(() => {
		setIsLoadingFiles(true);
		fetchDataFiles({
			type: "FILE",
		}).then(() => setIsLoadingFiles(false));
	}, []);

	useEffect(() => {
		
		setIsLoadingMedias(true);
		fetchDataMedias({
			type: "MEDIA",
		}).then(() => setIsLoadingMedias(false));
	}, []);

  return (
    <div className="min-h-[500px] p-4 sm:p-8">
      {/* Section Documents */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="font-medium text-neutral-950 text-lg sm:text-xl">
          Documents
        </h2>
        <div className="mt-2 sm:mt-0">
          <Btn variant="" className="text-brand-500 bg-transparent">
            <Download />
            <span className="ml-2">Tout Télécharger</span>
          </Btn>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dataFiles?.map((file, index) => (
          <CardFile key={index} file={file} />
        ))}
        <Uploader
          autoProceed={true}
          height="100%"
          restrictions={{
            maxNumberOfFiles: 5,
            maxFileSize: 10000000,
            allowedFileTypes: [
              "application/pdf",
              "text/csv",
              "text/plain",
              "application/zip",
              "application/x-rar-compressed",
              "application/vnd.ms-excel",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "application/vnd.ms-powerpoint",
              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            ]
          }}
          onFilesAdded={handleFilesAdded}
        />
        {isLoadingFiles && dataFiles.length === 0 && <Spinner />}
      </div>

      {/* Section Médias */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 mb-4">
        <h2 className="font-medium text-neutral-950 text-lg sm:text-xl">
          Médias
        </h2>
        <div className="mt-2 sm:mt-0">
          <Btn variant="" className="text-brand-500 bg-transparent">
            <Download />
            <span className="ml-2">Tout Télécharger</span>
          </Btn>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dataMedias?.map((media, index) => (
          <CardMedia key={index} media={media} />
        ))}
        <Uploader
          autoProceed={true}
          height="100%"
          restrictions={{
            maxNumberOfFiles: 5,
            maxFileSize: 10000000,
            allowedFileTypes: ["image/*"]
          }}
          onFilesAdded={handleFilesAdded}
        />
        {isLoadingMedias && dataMedias.length === 0 && <Spinner />}
      </div>
    </div>
  );
};

export default DocumentsTab;
