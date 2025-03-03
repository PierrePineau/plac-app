"use client";
import { useEffect, useRef, useState } from "react";
import { Uppy, debugLogger } from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard, useUppyEvent, useUppyState } from "@uppy/react";
import Compressor from "@uppy/compressor";
import DragDrop from "@uppy/drag-drop";
import French from "@uppy/locales/lib/fr_FR";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

interface uppyProps {
	onFilesAdded: (files: Files[]) => void;
	autoProceed: boolean;
	restrictions: {
		maxNumberOfFiles: number;
		maxFileSize: number;
		allowedFileTypes: string[];
	};
	height?: number | string;
	width?: number | string;
}

const Uploader: React.FC<uppyProps> = ({
	onFilesAdded,
	autoProceed = false,
	restrictions = {
		maxNumberOfFiles: 1,
		maxFileSize: 1000000,
		allowedFileTypes: ["image/*"],
	},
	height = 300,
	width = "100%",
}) => {
	const dragDropRef = useRef(null);
	const idOrg = localStorage.getItem("idOrganisation");
	const endpoint = "/api/app/organisations/" + idOrg + "/files";

	const locale_language = {
		...French,
		strings: {
			...French.strings,
			browse: "choisir",
			browseFiles: "choisir",
			browseFolders: "choisir",
			dropHereOr: "Glissez vos fichiers ici ou %{browse}",
			dropPasteBoth: "Glissez vos fichiers ici ou %{browse}",
			dropPasteFiles: "Glissez vos fichiers ici ou %{browse}",
			dropPasteImages: "Glissez vos images ici ou %{browse}",
			dropPasteImportBoth: "Glissez vos fichiers ici ou, importez ou %{browse}",
			dropPasteImportFiles: "Glissez vos fichiers ici ou, importez ou %{browse}",
		},
		pluralize: (n: number) => (n === 1 ? 0 : 1),
	};

	const createUppy = () => {
		return new Uppy({
			autoProceed,
			debug: true,
			logger: debugLogger,
			restrictions: {
				maxNumberOfFiles: restrictions.maxNumberOfFiles || 1,
				allowedFileTypes: restrictions.allowedFileTypes || ["image/*"],
				maxFileSize: restrictions.maxFileSize || 1000000, // 1MB
			},
			locale: locale_language,
		})
			.use(Compressor, {
				quality: 0.6,
			})
			.use(XHRUpload, {
				endpoint: endpoint,
				fieldName: "file",
				async onBeforeRequest(xhr) {
					let token = localStorage.getItem("jwtToken");
					// if (!token) {
					//   token = await getAuthToken();
					// }
					xhr.setRequestHeader("Authorization", `Bearer ${token}`);
				},
				allowedMetaFields: true,
			});
	};

	const [uppy] = useState(createUppy());
	useUppyEvent(uppy, "upload-success", (file, response) => {
		if (response.status !== 200) {
			console.error("Upload failed with response", response);
			return;
		} else {
			if (response.body && response.body.data) {
				const fileResp = response.body.data as Files;
				if (fileResp) {
					onFilesAdded([fileResp]);
				}
			}
		}
	});

	useEffect(() => {
		if (dragDropRef.current) {
			uppy.use(DragDrop, {
				target: dragDropRef.current,
			});
		}
		// return () => uppy.destroy();
	}, [uppy]);
	return (
		<Dashboard height={height} width={width} uppy={uppy} theme="light">
			<div ref={dragDropRef} className="uppy-DragDrop"></div>
		</Dashboard>
	);
};

export default Uploader;
