import React from "react";
import New from "./components/modals/New";
import HeaderPage from "@components/HeaderPage";
import Table from "./components/Table";
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
