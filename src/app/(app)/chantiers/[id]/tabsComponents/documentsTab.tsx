"use client";
import CustomButton from "@/components/custombutton";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import FileCard from "../../components/file_component";
import ImagesComponent from "../../components/images_component";
import Uploader from "@/components/uploader";
import { useFileStore, useMediaStore } from "@/store/user/fileStore";
import Spinner from "@/components/spinner";
import { CardFile, CardMedia } from "@/components/card";
import Btn from "@/components/btn";

interface ProjectProps {
	project: Project;
}

const DocumentsTab: React.FC<ProjectProps> = ({ project }) => {
	const [isloadingFiles, setIsLoadingFiles] = useState(false);
	const [isloadingMedias, setIsLoadingMedias] = useState(false);
	const { data: dataFiles, fetchData: fetchDataFiles } = useFileStore();
	const { data: dataMedias, fetchData: fetchDataMedias } = useMediaStore();

	const handleFilesAdded = (files: Files[]) => {
		console.log("Fichiers ajoutés :", files);
	};

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
				{dataFiles?.map((file, index) => (
					<CardFile key={index} file={file} />
				))}
				<Uploader
					autoProceed={true}
					height={"100%"}
					restrictions={{
						maxNumberOfFiles: 5,
						maxFileSize: 10000000, // 10 MB
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
						],
					}}
					onFilesAdded={handleFilesAdded}
				/>
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
				{dataMedias?.map((image, index) => (
					<CardMedia key={index} media={image} />
				))}
				<Uploader
					autoProceed={true}
					height={"100%"}
					restrictions={{
						maxNumberOfFiles: 5,
						maxFileSize: 10000000, // 10 MB
						allowedFileTypes: ["image/*"],
					}}
					onFilesAdded={handleFilesAdded}
				/>
				{isloadingMedias && dataMedias.length == 0 && <Spinner />}
				{/* <CustomDragDrop onFilesAdded={handleFilesAdded} /> */}
			</div>
		</div>
	);
};

export default DocumentsTab;
