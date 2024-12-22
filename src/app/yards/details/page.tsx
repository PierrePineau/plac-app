"use client";
import NavBar from "@/app/components/navBar";
import "../../globals.css";
import Header from "@/app/components/header";
import CustomButton from "@/app/components/custombutton";
import { FileEdit } from "lucide-react";
import Tabs from "../components/tabs";
import GeneralTab from "../components/tabsComponents/generalTab";
import DocumentsTab from "../components/tabsComponents/documentsTab";
import NotesTab from "../components/tabsComponents/notesTab";

const yard: Yard = {
  id: 1,
  reference: "Y001",
  code: 1001,
  name: "Maison n°1",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
  address: "12 Rue, Beaucouzé, 49000",
  archived: false,
  deleted: false,
  client: "Lorem Ipsum",
  medias: "/images/yard-image.jpg",
  files: "file1.pdf"
};

export default function Chantiers() {
  const tabs = [
    { label: "Général", content: <GeneralTab yard={yard} /> },
    { label: "Documents & Médias", content: <DocumentsTab /> },
    { label: "Bloc notes", content: <NotesTab /> }
  ];
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
                Mes chantiers /
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
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
