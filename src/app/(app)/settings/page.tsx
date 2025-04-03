import HeaderPage from "@/components/HeaderPage";
import Tabs from "@components/Tabs";
import { Metadata } from "next";
import Abonnement from "./components/tabs/Abonnement";
import General from "./components/tabs/General";
import Notifications from "./components/tabs/Notifications";
import Facturations from "./components/tabs/Facturations";

export const metadata: Metadata = {
  title: "Paramètres",
};

export default function Page() {
  const tabs = [
    {
      label: "Compte",
      content: <General />
    },
    {
      label: "Notifications",
      content: <Notifications />
    },
    {
      label: "Abonnement",
      content: <Abonnement />
    },
    {
      label: "Facturations",
      content: <Facturations />
    },
  ];

  return (
    <>
      <HeaderPage title="Paramètres" />
      <Tabs tabs={tabs} />
    </>
  );
}
