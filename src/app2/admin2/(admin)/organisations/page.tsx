import HeaderPage from "@/components2/HeaderPage";
import New from "./components/modals/New";
import Table from "./components/Table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organisations",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage title="Organisations">
        <New />
      </HeaderPage>
      <Table />
    </div>
  );
}
