"use client";

import Table from "./components/table";

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="  text-h2Desktop text-neutral-950">
          Organisations
        </h2>
        <Table />
      </div>
    </>
  );
}
