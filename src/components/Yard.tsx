import { Card as HeroUiCard, CardBody as HeroUiCardBody, CardFooter as HeroUiCardFooter} from "@heroui/card";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { Image } from "@heroui/react";
import Actions from "./Actions";
import { useEffect, useState } from "react";

interface ProjectProps {
  project: Project;
}

export default function Yard({ project }: ProjectProps) {
    const [path, setPath] = useState<string>("");
    const actions = [
        {
            key: "edit",
            icon: MoreVertical,
            label: "Modifier",
        },
        {
            key: "delete",
            label: "Supprimer",
            classname:"text-danger",
            color: "danger"
        }
    ];

    useEffect(() => {
        if (project.thumbnail) {
            const idOrg = localStorage.getItem("idOrganisation");
            setPath(`/${idOrg}/fichiers/${project.thumbnail.url}`);
        }else {
            setPath('/asset/img/yard.jpeg');
        }
    }, [project.thumbnail]);
    return (
        <HeroUiCard
        radius="sm"
        shadow="none"
        >
            <HeroUiCardBody className="overflow-visible p-0">
                <Link href={`/chantiers/${project.id}`}>
                    { path != "" && (
                        <Image alt={project.name} className="w-full object-cover object-center h-[230px]" width={"100%"} radius="sm" src={path} />
                    )}
                </Link>
            </HeroUiCardBody>
            <HeroUiCardFooter className="px-0 gap-2 flex items-start w-full">
                <div className="flex flex-col grow flex-shrink">
                    <Link href={`/chantiers/${project.id}`} className="flex-shrink inline-flex line-clamp-2 font-medium text-lg md:text-xl">
                        {project.name}
                        {/* <h3 className="text-neutral-950 font-medium truncate text-lg md:text-xl">{project.name}</h3> */}
                    </Link>
                    <p className="line-clamp-2 text-neutral-400 text-xs font-light">
                        {project.description}
                    </p>
                </div>
                {
                    actions.length > 0 && (
                        <div className="flex-shrink-0">
                            <Actions
                                onAction={(key) => console.log(key)}
                                items={actions}
                                />
                        </div>
                    )
                }
                
            </HeroUiCardFooter>
        </HeroUiCard>
  );
}
