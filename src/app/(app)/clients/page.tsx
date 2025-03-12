import React from "react";
import New from "./components/modals/new";
import HeaderPage from "@components/headerpage";
import Table from "./components/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients",
};

export default function Page() {
  return (
    <>
      <HeaderPage title="Mes clients">
        <New />
      </HeaderPage>
      <Table />
    </>
  );
}
