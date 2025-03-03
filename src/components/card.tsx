import React, { useEffect, useState } from "react";
import { Card as HeroUiCard, CardBody as HeroUiCardBody, CardFooter as HeroUiCardFooter} from "@heroui/card";
import { Image } from "@heroui/react";
import { Link, MoreHorizontal, MoreVertical } from "lucide-react";

interface CardProp {
	title: string | React.ReactNode;
	image?: Files;
	actions?: Array<any>;
    classname?: string;
}

const Card: React.FC<CardProp> = ({
    title,
    image = null,
    actions = [],
    classname = "",
}) => {
	// const [activeTab, setActiveTab] = useState(0);
    const classes = [];

    // if (href) {
    //     classes.push("cursor-pointer");
    //     classes.push("border-1 border-neutral-300");
    // }

    if (classname) {
        classes.push(classname);
    }

	return (
		<HeroUiCard
        radius="sm"
        shadow="none"
        className={classes.join(" ")}
        // isPressable
        // onPress={() => console.log("item pressed")}
        >
            {
                image && (
                    <HeroUiCardBody className="overflow-visible p-0">
                        <Image alt={image.name} className="w-full object-cover object-center h-[230px]" radius="sm" src={image.url} width="100%" />
                    </HeroUiCardBody>
                )
            }
			<HeroUiCardFooter className="text-small justify-between">
                {
                    title && typeof title === "string" ? (
                        <h3 className="text-default-900">{title}</h3>
                    ) : title
                }
                <MoreHorizontal className="text-neutral-950" />
			</HeroUiCardFooter>
		</HeroUiCard>
	);
};

interface CardFileProp {
	title?: string;
    file: Files;
	actions?: Array<any>;
    classname?: string;
}

const CardFile: React.FC<CardFileProp> = ({
    title = null,
    file,
    actions = [], // les actions à effectuer sur le fichier
    classname = "",
}) => {
    // const [activeTab, setActiveTab] = useState(0);
    const classes = [];

    // classes.push("cursor-pointer");
    classes.push("border-1 border-neutral-200 p-2");

    if (classname) {
        classes.push(classname);
    }

    const name = title || file.name;

    return (
        <HeroUiCard
        radius="sm"
        shadow="none"
        className={classes.join(" ")}
        >
            <HeroUiCardBody className="overflow-visible p-0">
                <div className="flex flex-row items-center justify-start gap-2">
                    <Link className="text-primary-500" />
                    <h3 className="text-neutral-950 font-medium truncate">{name}</h3>
                    <MoreHorizontal className="text-neutral-950 ml-auto" />
                </div>
                <span className="pl-8 mt-1 text-neutral-400 text-xs font-light">
                    {file.size < 1024
                        ? `${file.size} o`
                        : file.size < 1024 * 1024
                        ? `${(file.size / 1024).toFixed(2)} ko`
                        : file.size < 1024 * 1024 * 1024
                        ? `${(file.size / (1024 * 1024)).toFixed(2)} mo`
                        : `${(file.size / (1024 * 1024 * 1024)).toFixed(2)} go`}
                </span>
            </HeroUiCardBody>
        </HeroUiCard>
    );
}

interface CardMediaProp {
	title?: string;
    media?: Files;
    url?: string;
	actions?: Array<any>;
    classname?: string;
}

const CardMedia: React.FC<CardMediaProp> = ({
    title = null,
    media = null,
    url = "",
    actions = [], // les actions à effectuer sur le fichier
    classname = "",
}) => {
    // const [activeTab, setActiveTab] = useState(0);
    const classes = [];

    // classes.push("cursor-pointer");
    // classes.push("");

    if (classname) {
        classes.push(classname);
    }

    const [path, setPath] = useState("");
    const [name, setName] = useState(title || "");
    useEffect(() => {
        if (media) {
            if (!title) {
                setName(`${media.name}.${media.ext}`);
            }
            
            const idOrg = localStorage.getItem("idOrganisation");
            setPath(`/${idOrg}/fichiers/${media.url}`);
        }else {
            setPath(url);
            setName(title || "");
        }
    }, []);


    return (
        <HeroUiCard
        radius="sm"
        shadow="none"
        className={classes.join(" ")}
        >
            <HeroUiCardBody className="overflow-visible p-0">
                {
                    path != "" && (
                        <Image alt={name} className="w-full object-cover object-center h-[230px]" radius="sm" src={path} width="100%" />
                    )
                }
            </HeroUiCardBody>
			<HeroUiCardFooter className="text-small justify-between px-0 pb-0">
                <h3 className="text-neutral-950 font-medium truncate">{name}</h3>
                <MoreHorizontal className="text-neutral-950" />
			</HeroUiCardFooter>
        </HeroUiCard>
    );
}

export { Card, CardFile, CardMedia };
