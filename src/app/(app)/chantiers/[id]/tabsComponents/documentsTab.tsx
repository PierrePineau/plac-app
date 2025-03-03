"use client";
import CustomButton from "@/components/custombutton";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import Uploader from "@/components/uploader";
import { useFileStore, useMediaStore, useProjectFileStore, useProjectMediaStore } from "@/store/user/fileStore";
import Spinner from "@/components/spinner";
import { CardFile, CardMedia } from "@/components/card";
import Btn from "@/components/btn";

interface ProjectProps {
	project: Project;
}

const DocumentsTab: React.FC<ProjectProps> = ({ project }) => {
	const [isloadingFiles, setIsLoadingFiles] = useState(false);
	const [isloadingMedias, setIsLoadingMedias] = useState(false);
	const { data: dataFiles, fetchData: fetchDataFiles, setEndpoint: setEndpointFiles } = useProjectFileStore();
	const { data: dataMedias, fetchData: fetchDataMedias, setEndpoint: setEndpointMedias } = useProjectMediaStore();

	const handleFilesAdded = (files: Files[]) => {
		console.log("Fichiers ajoutés :", files);
		let newImage = files.filter((file) => file.type.includes("MEDIA"));
		let newFile = files.filter((file) => !file.type.includes("MEDIA"));

		// On va récupe les fichiers ajoutés et les envoyer au serveur
		// TODO : Ajouter directement au store ?
		if (newImage.length > 0) {
			fetchDataMedias({
				idProject: project.id,
				type: "MEDIA",
			});
		}
		if (newFile.length > 0) {
			fetchDataFiles({
				idProject: project.id,
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
			idProject: project.id,
			type: "FILE",
		}).then(() => setIsLoadingFiles(false));
	}, []);

	useEffect(() => {
		
		setIsLoadingMedias(true);
		fetchDataMedias({
			idProject: project.id,
			type: "MEDIA",
		}).then(() => setIsLoadingMedias(false));
	}, []);

	return (
		<div className="min-h-[500px]">
			<div className="flex flex-row justify-between items-center mb-4">
				<h2 className="font-medium text-neutral-950">Documents</h2>
                <Btn variant="" className="text-brand-500 bg-transparent">
                    <Download className="" />
                    Tout Télécharger
                </Btn>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Uploader
					autoProceed={true}
					height={"100%"}
					metaFields={{
						idProject: project.id,
					}}
					restrictions={{
						maxNumberOfFiles: 5,
						maxFileSize: 1000000, // 1 MB
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
						],
					}}
					onFilesAdded={handleFilesAdded}
				/>
				{dataFiles?.map((file, index) => (
					<CardFile key={index} file={file} />
				))}
				{isloadingFiles && dataFiles.length == 0 && <Spinner />}
				{/* <CustomDragDrop onFilesAdded={handleFilesAdded} /> */}
			</div>
			<div className="flex flex-row justify-between items-center mt-6  mb-4">
				<h2 className="font-medium text-neutral-950">Médias</h2>
                <Btn variant="" className="text-brand-500 bg-transparent">
                    <Download className="" />
                    Tout Télécharger
                </Btn>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Uploader
					autoProceed={true}
					height={"100%"}
					metaFields={{
						idProject: project.id,
					}}
					restrictions={{
						maxNumberOfFiles: 5,
						maxFileSize: 1000000, // 1 MB
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
						],
					}}
					onFilesAdded={handleFilesAdded}
				/>
				{dataMedias?.map((image, index) => (
					<CardMedia key={index} media={image} />
				))}
				{isloadingMedias && dataMedias.length == 0 && <Spinner />}
				{/* <CustomDragDrop onFilesAdded={handleFilesAdded} /> */}
			</div>
		</div>
	);
};

export default DocumentsTab;
