import HeaderPage from "@/components/HeaderPage";
import New from "./components/modals/New";
import Table from "./components/Table";
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
