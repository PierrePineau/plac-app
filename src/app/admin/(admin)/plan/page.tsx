import HeaderPage from "@components/headerpage";
import { Metadata } from "next";
import New from "./components/modal/new";
import Table from "./components/table";

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
