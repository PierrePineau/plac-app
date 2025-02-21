"use client";
import NavBar from "./components/navBar";
import Header from "./components/header";
import { Providers } from "./providers";
import { AuthGuard } from "@/core/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AuthGuard role="ROLE_USER">
        <div className="flex flex-row w-full h-full grow">
          <div className="sticky bg-white hidden md:block border-r border-neutral-200">
            <NavBar />
          </div>
          <div className="flex flex-col w-full">
            <div className="top-0 bg-white z-10 border-b border-neutral-200">
              <Header />
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
