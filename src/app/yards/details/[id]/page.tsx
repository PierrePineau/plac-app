"use client";

import NavBar from "@/app/components/navBar";
import "../../../globals.css";
import Header from "@/app/components/header";
import CustomButton from "@/app/components/custombutton";
import { FileEdit } from "lucide-react";
import Tabs from "../../components/tabs";
import GeneralTab from "../../components/tabsComponents/generalTab";
import DocumentsTab from "../../components/tabsComponents/documentsTab";
import NotesGrid from "../../components/tabsComponents/notesTab";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useYardStore } from "@/store/yardStore";

export default function YardDetail() {
  const router = useRouter();
  const { id } = useParams();
  const getYardById = useYardStore((state) => state.getYardById);
  const fetchYards = useYardStore((state) => state.fetchYards);
  const [yard, setYard] = useState<Yard | null>(null);

  useEffect(() => {
    if (id) {
      const yardData = getYardById(Number(id));
      if (yardData) {
        setYard(yardData);
      } else {
        fetchYards().then(() => {
          const fetchedYard = getYardById(Number(id));
          setYard(fetchedYard || null);
        });
      }
    }
  }, [id, getYardById, fetchYards]);

  if (!yard) {
    return <div>Chargement des détails du chantier...</div>;
  }

  const tabs = [
    { label: "Général", content: <GeneralTab yard={yard} /> },
    { label: "Documents & Médias", content: <DocumentsTab yard={yard} /> },
    { label: "Bloc notes", content: <NotesGrid notes={yard.notes || []} /> }
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
          src={"/asset/img/yard.jpeg"}
          alt={yard.name}
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
                onClick={() => router.push(`/yard/edit/${yard.id}`)}
                hover={""}
              />
            </div>
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
