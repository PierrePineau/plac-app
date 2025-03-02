'use client';
import { useEffect, useRef, useState } from "react";
import { Uppy, debugLogger } from '@uppy/core';
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard, useUppyEvent, useUppyState } from "@uppy/react";
import Compressor from '@uppy/compressor';
import DragDrop from '@uppy/drag-drop';
import French from '@uppy/locales/lib/fr_FR';
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

interface uppyProps {
  autoProceed: boolean;
  restrictions: {
    maxNumberOfFiles: number,
    maxFileSize: number,
    allowedFileTypes: string[]
  };
}

const Uploader: React.FC<uppyProps> = ({
  autoProceed = false,
  restrictions = {
    maxNumberOfFiles: 1,
    maxFileSize: 1000000,
    allowedFileTypes: ["image/*"]
  },
}) => {
  const dragDropRef = useRef(null);
  const idOrg = localStorage.getItem("idOrganisation");
  const endpoint = "/api/app/organisations/" + idOrg + "/files";
  const createUppy = () => {
    return new Uppy({
        autoProceed,
        debug: true,
        logger: debugLogger,
        restrictions: {
          maxNumberOfFiles: restrictions.maxNumberOfFiles || 1,
          allowedFileTypes: restrictions.allowedFileTypes || ["image/*"],
          maxFileSize: restrictions.maxFileSize || 1000000 // 1MB
        },
        locale: French,
      })
      .use(Compressor, {
        quality: 0.6,
      }).use(XHRUpload, {
        endpoint: endpoint,
        fieldName: "file",
        async onBeforeRequest(xhr) {
          let token = localStorage.getItem("jwtToken");
          // if (!token) {
          //   token = await getAuthToken();
          // }
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        },
        allowedMetaFields: true,
      })
  }
  
  const [uppy] = useState(createUppy());
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useUppyEvent(uppy, "upload-success", (file, response) => {
    console.log("Successful upload", file, response);
    // const path = response.body?.path;
    // setUploadedFiles((prev: {name: string, url: string}) => [...prev, { name: file.name, url: path }]);
  });

  useEffect(() => {
    if (dragDropRef.current) {
      uppy.use(DragDrop, { target: dragDropRef.current });
    }
    // return () => uppy.destroy();
  }, [uppy]);
  return <Dashboard uppy={uppy} theme="light">
    <div ref={dragDropRef} className="uppy-DragDrop"></div>
  </Dashboard>;
};

export default Uploader;
