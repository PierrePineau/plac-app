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
import React from 'react';

interface AsideProps {
    children: React.ReactNode;
}

const Aside: React.FC<AsideProps> = ({ children }) => {
    return (
        <aside>
            <div className="hidden md:flex w-sideBarWidth md:flex-col">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white p-8 gap-4">
                    <div className="flex flex-row justify-between items-center flex-shrink-0 pb-10">
                        <img
                        className="w-auto h-8"
                        src="/asset/img/logo.svg"
                        alt="Logo Plac"
                        />
                        <ArrowLeftFromLine
                        className=" text-black w-6 h-6"
                        // onClick={handleLogout}
                        />
                    </div>
                    {children}
                </div>
            </div>
        </aside>
    );
};

export default Aside;