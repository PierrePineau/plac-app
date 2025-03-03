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