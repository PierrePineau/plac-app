"use client";
import { useState } from "react";
import FilterPlanning from "./FilterPlanning";
import ScheduleTable from "./SchedulePlanning";

export default function DayPlanning() {
  return (
    <div className="flex flex-col bg-white w-full">
      <FilterPlanning />
      <ScheduleTable />
    </div>
  );
}
