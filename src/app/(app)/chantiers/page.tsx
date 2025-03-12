import HeaderPage from "@components/HeaderPage";
import New from "./components/modals/New";
import { Metadata } from "next";
import Table from "./components/table";

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

