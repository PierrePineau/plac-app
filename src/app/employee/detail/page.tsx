"use client";
import NavBar from "@/app/components/navBar";
import "../../globals.css";
import Header from "@/app/components/header";
import CustomButton from "@/app/components/custombutton";
import { FileEdit } from "lucide-react";

export default function EmployeeDetail({employe: }) {
  return (
    <div className="flex flex-row bg-white h-full">
      <div className="sticky bg-white hidden md:block border-r border-neutral-200">
        <NavBar />
      </div>

      <div className="flex flex-col w-full">
        <div className="top-0 bg-white z-10 border-b border-neutral-200">
          <Header />
        </div>
        <img
          className="w-full max-h-72 object-cover"
          src="/asset/img/yard.jpeg"
          alt="Logo Plac"
        />
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <p className="text-neutral-400 font-satoshi text-paragraphMedium">
                Mes employés /
              </p>
              <p className=" text-neutral-950 text-paragraphMedium font-satoshi">
                {yard.name}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className=" font-satoshi text-h1Desktop text-neutral-900">
                {yard.name}
              </h1>
              <CustomButton
                text="Modifier les informations"
                icon={<FileEdit />}
                color="bg-brand-950"
                textColor="text-white"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
