import {Breadcrumbs, BreadcrumbItem} from "@heroui/breadcrumbs";
import React from "react";

interface BreadcrumbsProps {
    name: string;
}

const AppBreadcrumbs: React.FC<BreadcrumbsProps> = ({
    name
}) => {
    const generateBreadcrumbs = () => {
        const pathnames = window.location.pathname.split('/').filter(x => x);
        return (
            <Breadcrumbs separator="/">
                {/* <BreadcrumbItem href="/">Home</BreadcrumbItem> */}
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <BreadcrumbItem key={to} href={isLast ? undefined : to} aria-current={isLast ? 'page' : undefined}>
                            {isLast ? name : value.charAt(0).toUpperCase() + value.slice(1)}
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumbs>
        );
    };

    return generateBreadcrumbs();
};

export default AppBreadcrumbs;