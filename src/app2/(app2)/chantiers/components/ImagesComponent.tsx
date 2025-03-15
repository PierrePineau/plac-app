import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface ImageItemProps {
  fileName: string;
  filePath: string;
}

const ImagesComponent: React.FC<ImageItemProps> = (image) => {
  return (
    <Link href="/yards/details">
      <div className="flex flex-col gap-2 rounded-lg">
        <div className="w-full h-56 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={image.filePath}
            alt="Logo Plac"
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-paragraphBold text-neutral-950  ">
              {image.fileName}
            </p>
          </div>
          <MoreVertical className="text-neutral-950" />
        </div>
      </div>
    </Link>
  );
};

export default ImagesComponent;
