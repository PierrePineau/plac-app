import HeaderPage from "@/components2/HeaderPage";
import { Metadata } from "next";
import InConstruction from "@/components2/InConstruction";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return (
    <>
      <HeaderPage title="Messages">
        {/* <New /> */}
      </HeaderPage>
      {/* <Table /> */}
      <InConstruction />
    </>
  );
}

