"use client";
import CustomButton from "@/components/CustomButton";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  List
} from "lucide-react";
import { useState } from "react";

export default function FilterPlanning() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-2 items-center">
          <ChevronLeft className="text-neutral-950" onClick={() => {}} />
          <p className="  text-h2Desktop text-neutral-950">
            9 - 15 Décembre
          </p>
          <ChevronRight className="text-neutral-950" onClick={() => {}} />
        </div>
        <CustomButton
          text={"Aujourd'hui"}
          color={"bg-neutral-50"}
          textColor={"text-neutral-950"}
          hover={"bg-neutral-100"}
          border="border border-neutral-200"
          onClick={() => {}}
        />
      </div>
      <div className="flex flex-row gap-2">
        <div className="bg-neutral-50 hover:bg-neutral-100 rounded-lg w-12 h-12 flex justify-center items-center">
          <List
            height={22}
            width={22}
            className="text-neutral-950"
            onClick={() => {}}
          />
        </div>
        <div className="bg-neutral-50 hover:bg-neutral-100 rounded-lg w-12 h-12 flex justify-center items-center">
          <Calendar
            height={22}
            width={22}
            className="text-neutral-950"
            onClick={() => {}}
          />
        </div>
        <CustomButton
          icon={<Download />}
          text={"Exporter"}
          color={"bg-neutral-50"}
          textColor={"text-neutral-950"}
          hover={"bg-neutral-100"}
          onClick={() => {}}
          border="border border-neutral-200"
        />
      </div>
    </div>
  );
}
