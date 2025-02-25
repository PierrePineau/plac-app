import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const CustomDragDrop: React.FC<{ onFilesAdded: (files: File[]) => void }> = ({
  onFilesAdded
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="border-dashed border-2 p-4 text-center">
      <input {...getInputProps()} />
      <p>Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</p>
    </div>
  );
};

export default CustomDragDrop;
