import HeaderPage from "@components/HeaderPage";
import { Metadata } from "next";
import New from "./components/modal/new";
import Table from "./components/table";

export const metadata: Metadata = {
  title: "Plans",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage title="Plans">
        <New />
      </HeaderPage>
      <Table />
    </div>
  );
}
