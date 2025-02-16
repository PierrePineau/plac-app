import React from "react";
import AppBreadcrumbs from "./breadcrumbs";

interface HeaderPageProps {
    title: string;
    children?: React.ReactNode;
    showBreadcrumb?: boolean;
}

const HeaderPage: React.FC<HeaderPageProps> = ({ 
    title = "",
    children = null,
    showBreadcrumb = false
}) => {
    return (
        <div className="flex flex-col gap-4">
            {showBreadcrumb && (
                <AppBreadcrumbs name={title} />
            )}
            <div className="flex justify-between gap-4 flex-wrap">
                <h1 className="text-xl md:text-3xl font-bold">
                    {title}
                </h1>
                <div className="flex gap-4 flex-wrap max-w-[350px]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default HeaderPage;

// <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
//         <div className="flex flex-col gap-2">
//         <div className="flex flex-row gap-1">
//             <p className="text-neutral-400   text-paragraphMedium">
//             Mes chantiers /
//             </p>
//             <p className=" text-neutral-950 text-paragraphMedium  ">
//             {project.name}
//             </p>
//         </div>
//         <div className="flex flex-row justify-between">
//             <h1 className="   text-h1Desktop text-neutral-900">
//             {project.name}
//             </h1>
//             <div className="flex flex-row gap-4">
//             <CustomButton
//                 text="Imprimer"
//                 icon={<Printer />}
//                 color="bg-white"
//                 textColor="text-neutral-950"
//                 onClick={() => router.push(`/project/edit/${project.id}`)}
//                 hover={"bg-neutral-100"}
//                 border="border border-neutral-200"
//             />
//             <CustomButton
//                 text="Modifier les informations"
//                 icon={<FileEdit />}
//                 color="bg-brand-950"
//                 textColor="text-white"
//                 onClick={handleModifyProject}
//                 hover={"bg-brand-1000"}
//             />
//             </div>
//         </div>
//         </div>
//         <Tabs tabs={tabs} />
//         </div>