"use client";
import { useState } from "react";
import CustomButton from "../../../components/custombutton";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import DayPlanning from "./components/dayPlanning";
import Tabs from "../../../components/tabs";

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
    <div className="flex flex-row bg-white h-full">
      <div className="sticky bg-white hidden md:block border-r border-neutral-200">
        <NavBar />
      </div>

      <div className="flex flex-col w-full">
        <div className="top-0 bg-white z-10 border-b border-neutral-200">
          <Header />
        </div>
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-row justify-between">
            <p className="text-h1Desktop text-neutral-950  ">
              Planning
            </p>
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
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
