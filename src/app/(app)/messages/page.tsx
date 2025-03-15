import HeaderPage from "@/components/HeaderPage";
import { Metadata } from "next";
import InConstruction from "@/components/InConstruction";

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

