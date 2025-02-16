"use client";
import NavBar from "./components/navBar";
import Header from "./components/header";
import { Providers } from "./providers";
import { AuthGuard } from "@/core/context/AuthContext";

// export const metadata = {
//   title: 'Plac',
//   description: 'Application de gestion de chantiers',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AuthGuard role="ROLE_USER">
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
      </AuthGuard>
    </Providers>
  );
}
