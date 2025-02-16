"use client";

import New from "./components/modals/new";
import Table from "./components/table";

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-4">
        
        <div className="flex flex-wrap justify-between gap-4">
          <h2 className="text-h2Desktop text-neutral-950">
            Organisations
          </h2>
          <div className="flex gap-4">
            <New />
          </div>
        </div>
        <Table />
      </div>
    </>
  );
}
