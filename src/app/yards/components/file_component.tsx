import { Link, MoreHorizontal } from "lucide-react";
import React from "react";

interface FileCardProps {
  fileName: string;
  fileSize: string;
  onMoreClick?: () => void;
  onLinkClick?: () => void;
}

const FileCard: React.FC<FileCardProps> = ({
  fileName,
  fileSize,
  onMoreClick,
  onLinkClick
}) => {
  return (
    <div className="flex items-center justify-between p-4 border border-neutral-200 text-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <Link
          className="text-brand-500 text-xl cursor-pointer"
          onClick={onLinkClick}
        />
        <div>
          <p className="text-paragraphBold font-satoshi text-neutral-950 truncate">
            {fileName}
          </p>
          <p className="text-tag font-satoshi text-gray-500">{fileSize}</p>
        </div>
      </div>
      <MoreHorizontal
        className="text-neutral-950 cursor-pointer"
        onClick={onMoreClick}
      />
    </div>
  );
};

export default FileCard;
