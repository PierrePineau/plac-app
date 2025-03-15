import HeaderPage from "@/components2/HeaderPage";
import { Metadata } from "next";
import New from "./components/modal/New";
import Table from "./components/Table";

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
