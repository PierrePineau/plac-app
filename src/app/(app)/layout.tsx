"use client";
import { useState } from "react";
import NavBar from "./components/navBar";
import Header from "./components/header";
import { Providers } from "./providers";
import { AuthGuard } from "@/core/context/AuthContext";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const handleCloseNav = () => {
    setIsNavOpen(false);
  };

  return (
    <Providers>
      <AuthGuard role="ROLE_USER">
        <div className="flex flex-row w-full h-full grow relative">
          <NavBar isNavOpen={isNavOpen} onCloseNav={handleCloseNav} />
          <div className="flex flex-col w-full">
            <div className="sticky top-0 bg-white z-10 border-b border-neutral-200">
              <Header onToggleNav={handleToggleNav} />
            </div>
            <main className="flex flex-col bg-white overflow-auto p-8 gap-8">
              {children}
            </main>
          </div>
        </div>
      </AuthGuard>
    </Providers>
  );
}
