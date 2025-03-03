import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface ProjectProps {
  projects: Project[];
}

export default function Yard({ projects }: ProjectProps) {
  return (
    <>
      <div className="sm:hidden flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          {projects?.length ? (
            projects.map((project: Project) => (
              <Link key={project.id} href={`../chantiers/${project.id}`}>
                <div className="flex flex-col gap-4 rounded-lg">
                  <div className="w-full h-40 rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="/asset/img/yard.jpeg"
                      alt="Logo Plac"
                    />
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <p className="text-lg text-neutral-950">{project.name}</p>
                      <p className="text-sm text-neutral-400">
                        {project.description}
                      </p>
                    </div>
                    <MoreVertical className="text-neutral-950" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-neutral-500">No yards available</p>
          )}
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-8">
            {projects?.length ? (
              projects.map((project: Project) => (
                <Link key={project.id} href={`../chantiers/${project.id}`}>
                  <div className="flex flex-col gap-6 rounded-lg">
                    <div className="w-full h-56 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="/asset/img/yard.jpeg"
                        alt="Logo Plac"
                      />
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <p className="text-h3Desktop text-neutral-950">
                          {project.name}
                        </p>
                        <p className="text-tag text-neutral-400">
                          {project.description}
                        </p>
                      </div>
                      <MoreVertical className="text-neutral-950" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-neutral-500">No yards available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
