import HeaderPage from "@/components/HeaderPage";
import { Metadata } from "next";
import InConstruction from "@/components/InConstruction";

export const metadata: Metadata = {
  title: "Tâches",
};

export default function Page() {
  return (
    <>
      <HeaderPage title="Tâches">
        {/* <New /> */}
      </HeaderPage>
      {/* <Table /> */}
      <InConstruction />
    </>
  );
}

