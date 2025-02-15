"use client";

import Dropdown from "../../../../components/customDropdown";
import DataTable from "../../../../components/DataTable";
import Stats from "./components/stats";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/store/user/projectStore";
import { useOrganisationStore } from "@/store/user/organisationStore";
import { useAdminStore } from "@/store/admin/adminStore";
import TableOrg from "../organisations/components/table";
import TableUser from "../users/components/table";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="  text-h2Desktop text-neutral-950">
          Organisations
        </p>
        <TableOrg />
      </div>
      <div className="flex flex-col gap-4">
        <p className="  text-h2Desktop text-neutral-950">
          Utilisateurs
        </p>
        <TableUser />
      </div>
    </>
  );
}
