import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface ProjectProps {
  projects: Project[];
}

export default function Yard({ projects }: ProjectProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
      {projects?.length ? (
        projects.map((project: Project) => (
          <Link key={project.id} href={`../chantiers/${project.id}`}>
            <div className="flex flex-col gap-4 rounded-lg">
              <div className="w-full h-40 sm:h-56 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="/asset/img/yard.jpeg"
                  alt="Logo Plac"
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="text-lg sm:text-h3Desktop text-neutral-950">
                    {project.name}
                  </p>
                  <p className="text-sm sm:text-tag text-neutral-400">
                    {project.description}
                  </p>
                </div>
                <MoreVertical className="text-neutral-950" />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="col-span-full text-center text-neutral-500">
          No yards available
        </p>
      )}
    </div>
  );
}
