"use client";
import { useState } from "react";
import FilterPlanning from "./filterPlanning";
import ScheduleTable from "./schedulePlanning";

export default function DayPlanning() {
  return (
    <div className="flex flex-col bg-white w-full">
      <FilterPlanning />
      <ScheduleTable />
    </div>
  );
}
