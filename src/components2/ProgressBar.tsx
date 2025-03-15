import { Building } from "lucide-react";
import React from "react";

type ProgressBarProps = {
  label: string | null;
  progress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ label, progress }) => {
  return (
    <div className="flex flex-col items-start justify-between">
      <div className="flex flex-row items-center justify-between">
        {label && (
          <div className="flex flex-row gap-2">
            <div className="rounded">
              <Building className="text-neutral-400" />
            </div>
            <p className="text-gray-400">{label}</p>
          </div>
        )}
        <p className="text-gray-950">{progress}%</p>
      </div>
      <div className="flex items-center space-x-3 w-full">
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-blue-900 rounded-full"
            style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
