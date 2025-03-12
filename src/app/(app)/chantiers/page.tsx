import HeaderPage from "@components/headerpage";
import New from "./components/modals/new";
import { Metadata } from "next";
import Table from "./components/table";

export const metadata: Metadata = {
  title: "Chantiers",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage title="Chantiers">
        <New />
      </HeaderPage>
      <Table />
    </div>
  );
}

