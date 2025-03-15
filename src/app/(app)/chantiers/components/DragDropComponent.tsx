import { FileDown } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DragDropProps {
  onDrop: (acceptedFiles: File[]) => void;
  width?: string | null;
  height?: string | null;
}

const DragDropComponent: React.FC<DragDropProps> = ({
  onDrop,
  width = "w-1/2",
  height = "h-48"
}) => {
  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropAccepted,
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer ${
        isDragActive ? "border-blue-400 " : "border-gray-300 "
      } ${width} ${height}`} // Application des classes de largeur et de hauteur
    >
      <input {...getInputProps()} />
      <div className="flex items-center space-x-2 text-gray-300">
        <FileDown className="text-neutral-400" />
        <p className="text-tag   text-neutral-400">
          Glissez vos fichiers ici ou{" "}
          <span className="text-neutral-500   text-tag underline">
            choisir
          </span>
        </p>
      </div>
    </div>
  );
};

export default DragDropComponent;
