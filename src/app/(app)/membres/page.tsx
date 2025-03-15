import HeaderPage from "@/components/HeaderPage";
import New from "./components/modals/New";
import Table from "./components/Table";
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
