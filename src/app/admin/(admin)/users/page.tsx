import HeaderPage from "@components/headerpage";
import New from "./components/modals/new";
import Table from "./components/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utilisateurs",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage title="Utilisateurs">
        <New />
      </HeaderPage>
      <Table />
    </div>
  );
}
