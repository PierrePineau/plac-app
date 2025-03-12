import HeaderPage from "@components/HeaderPage";
import New from "./components/modals/new";
import Table from "./components/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membres",
};

export default function Page() {
  return (
    <>
      <HeaderPage title="Membres">
        <New />
      </HeaderPage>
      <Table />
    </>
  );
}
