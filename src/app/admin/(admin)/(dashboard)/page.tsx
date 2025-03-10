"use client";
export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="  text-h2Desktop text-neutral-950">
          Organisations
        </p>
        {/* <TableOrg /> */}
      </div>
      <div className="flex flex-col gap-4">
        <p className="  text-h2Desktop text-neutral-950">
          Utilisateurs
        </p>
        {/* <TableUser /> */}
      </div>
    </>
  );
}
