import {
    ArrowLeftFromLine,
    House,
    Building,
    Users,
    Calendar,
    Newspaper,
    MessageCircle,
    Settings,
    LogOut,
    Rocket,
    LinkIcon
  } from "lucide-react";
  import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
import React from 'react';

interface AsideProps {
    isOpen: boolean;
    onOpenChange: () => void;
    children: React.ReactNode;
}

const Aside: React.FC<AsideProps> = ({
    isOpen,
    onOpenChange,
    children
}) => {

    const renderChildren = () => {
        return (
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white p-6 gap-8">
                <div className="flex flex-row justify-between items-center flex-shrink-0">
                    <img
                    className="w-auto h-8"
                    src="/asset/img/logo.svg"
                    alt="Logo Plac"
                    />
                    <ArrowLeftFromLine
                    className="hidden md:block text-black w-6 h-6"
                    // onClick={handleLogout}
                    />
                </div>
                {children}
            </div>
        );
    }
    return (
        <>
            {/* MOBILE AVEC DRAWER */}
                <Drawer
                    isOpen={isOpen}
                    placement={"left"}
                    onOpenChange={onOpenChange}
                    size={"md"}
                    className=""
                    radius="none"
                >
                <DrawerContent
                    className=""
                >
                {(onClose) => (
                    renderChildren()
                )}
                </DrawerContent>
            </Drawer>
            
            {/* ORDI */}
            <aside className="hidden md:flex w-sideBarWidth border-r border-neutral-200">
                <div className="flex w-sideBarWidth flex-col">
                    { renderChildren() }
                </div>
            </aside>
        </>
      );
};

export default Aside;