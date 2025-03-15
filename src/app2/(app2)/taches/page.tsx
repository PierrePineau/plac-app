import HeaderPage from "@/components2/HeaderPage";
import { Metadata } from "next";
import InConstruction from "@/components2/InConstruction";

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

