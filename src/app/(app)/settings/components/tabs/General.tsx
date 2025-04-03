"use client";
import BubbleText from "@/components/BubbleText";
import MapComponent from "@/components/MapComponent";
import ProgressBar from "@/components/ProgressBar";
import AppDebugInfo from "@components/AppDebugInfo";
import { Progress } from "@heroui/react";
import {
  CalendarMinus,
  CalendarPlus,
  ExternalLink,
  HardHat,
  Mail,
  MapPin,
  Phone,
  User
} from "lucide-react";

const General: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
        <AppDebugInfo />
    </div>
  );
};


export default General;