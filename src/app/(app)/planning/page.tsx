"use client";
import { useState } from "react";
import CustomButton from "../../../components/custombutton";
import DayPlanning from "./components/dayPlanning";
import Tabs from "../../../components/tabs";
import HeaderPage from "../../../components/headerpage";
import InConstruction from "@/components/inConstruction";

export default function PlanningPage() {
  const tabs = [
    { label: "Jour", content: <DayPlanning /> },
    {
      label: "Semaine",
      content: <div />
    },
    { label: "Mois", content: <div /> }
  ];

  return (
    <div className="flex flex-col gap-4">
      <InConstruction />
      <HeaderPage title="Planning">
        {/* <New title={"Ajouter un chantier"} /> */}
        <CustomButton
              icon={
                <img
                  src="/asset/img/googleCalendar.svg"
                  alt="Google Calendar"
                  width="25"
                  height="25"
                />
              }
              text="Synchroniser avec Google Agenda"
              color="bg-brand-950"
              textColor="text-white"
              onClick={() => {}}
              hover={"bg-brand-1000"}
            />
      </HeaderPage>
      <Tabs tabs={tabs} />
    </div>
  );
}
