import HeaderPage from "@/components2/HeaderPage";
import New from "./components/modals/New";
import { Metadata } from "next";
import Table from "./components/Table";

export const metadata: Metadata = {
  title: "Chantiers",
};

export default function Page() {
  return (
    <>
      <HeaderPage title="Chantiers">
        <New />
      </HeaderPage>
      <Table />
    </>
  );
}

