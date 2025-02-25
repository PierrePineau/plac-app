import React, { useEffect } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const Uploader: React.FC<{ endpoint: string }> = ({ endpoint }) => {
  const uppy = new Uppy({ autoProceed: false });
  uppy.use(XHRUpload, { endpoint });
  useEffect(() => {
    return () => uppy.destroy();
  }, [uppy]);
  return <Dashboard uppy={uppy} />;
};

export default Uploader;
