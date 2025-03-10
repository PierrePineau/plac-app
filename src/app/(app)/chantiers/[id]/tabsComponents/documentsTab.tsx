"use client";
import CustomButton from "@/components/custombutton";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import FileCard from "../../components/file_component";
import Uploader from "@/components/uploader";
import { useFileStore, useMediaStore, useProjectFileStore, useProjectMediaStore } from "@/store/user/fileStore";
import Spinner from "@/components/spinner";
import { CardFile, CardMedia } from "@/components/card";
import Btn from "@/components/btn";

interface ProjectProps {
  project: Project;
}

const DocumentsTab: React.FC<ProjectProps> = ({ project }) => {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isLoadingMedias, setIsLoadingMedias] = useState(false);
  const { data: dataFiles, fetchData: fetchDataFiles, setEndpoint: setEndpointFiles } = useProjectFileStore();
  const { data: dataMedias, fetchData: fetchDataMedias,setEndpoint: setEndpointMedias  } = useProjectMediaStore();

  const actions = [
    { key: "download", label: "Télécharger" },
    { key: "edit", label: "Modifier" },
    { key: "delete", label: "Supprimer", classname: "text-danger", color: "danger" },
  ];

  const handleAction = (key: string, file: Files) => {
    switch (key) {
      case "download":
        console.log("Télécharger");
        break;
      case "edit":
        console.log("Modifier");
        break;
      case "delete":
        console.log("Supprimer");
        break;
      default:
        console.log("Action inconnue");
        break;
    }
  }

	const handleFilesAdded = (files: Files[]) => {
		const newImage = files.filter((file) => file.type.includes("MEDIA"));
		const newFile = files.filter((file) => !file.type.includes("MEDIA"));

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
	}, [setEndpointFiles, setEndpointMedias, project.id]);

	useEffect(() => {
		setIsLoadingFiles(true);
		fetchDataFiles({
			type: "FILE",
		}).then(() => setIsLoadingFiles(false));
	}, [fetchDataFiles]);

	useEffect(() => {
		setIsLoadingMedias(true);
		fetchDataMedias({
			type: "MEDIA",
		}).then(() => setIsLoadingMedias(false));
	}, [fetchDataMedias]);

  return (
    <div className="min-h-[500px] p-4 sm:p-8 @container/">
      {/* Section Documents */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="font-medium text-neutral-950 text-lg sm:text-xl">
          Documents
        </h2>
        <div className="mt-2 sm:mt-0">
          <Btn variant="" className="text-brand-500 bg-transparent">
            <Download />
            Tout Télécharger
          </Btn>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Uploader
          autoProceed={true}
          height="100%"
          metaFields={{
						idProject: project.id,
					}}
          restrictions={{
            maxNumberOfFiles: 5,
            maxFileSize: 1000000,
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
              "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              "image/*",
            ]
          }}
          onFilesAdded={handleFilesAdded}
        />
        {dataFiles?.map((file, index) => (
          <CardFile key={index} file={file} actions={actions} />
        ))}
        {isLoadingFiles && dataFiles.length === 0 && <Spinner />}
      </div>
      {/* Section Médias */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mt-6 mb-4">
        <h2 className="font-medium text-neutral-950 text-lg md:text-xl">
          Médias
        </h2>
        <div className="">
          <Btn variant="" className="text-brand-500 bg-transparent">
            <Download />Tout Télécharger
          </Btn>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Uploader
          autoProceed={true}
          height="100%"
          metaFields={{
            idProject: project.id,
          }}
          restrictions={{
            maxNumberOfFiles: 5,
            maxFileSize: 1000000, // 1MB
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
              "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              "image/*",
            ]
          }}
          onFilesAdded={handleFilesAdded}
          />
        {dataMedias?.map((media, index) => (
          <CardMedia key={index} media={media} actions={actions} handleAction={handleAction} />
        ))}
        
        {isLoadingMedias && dataMedias.length === 0 && <Spinner />}
      </div>
    </div>
  );
};

export default DocumentsTab;
