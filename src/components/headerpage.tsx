"use client";
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
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex gap-2 flex-col">
                {showBreadcrumb && (
                    <AppBreadcrumbs name={title} />
                )}
                <h1 className="text-xl md:text-3xl font-bold">
                    {title}
                </h1>
            </div>
            <div className="flex gap-4 flex-wrap md:max-w-[500px]">
                {children}
            </div>
        </div>
    );
};

export default HeaderPage;