"use client";
import { AuthGuard } from "@/core/context/AuthContext";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Providers } from "./Providers";
import { useDisclosure } from "@heroui/modal";

// export const metadata = {
//   title: 'Plac',
//   description: 'Application de gestion de chantiers',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <Providers>
      <AuthGuard role="ROLE_ADMIN">
          <div className="flex flex-row w-full h-full grow">
            <div className="sticky bg-white hidden md:block border-r border-neutral-200">
              <NavBar isNavOpen={isOpen} onCloseNav={onOpenChange} />
            </div>
            <div className="flex flex-col w-full">
              <div className="top-0 bg-white z-10 border-b border-neutral-200">
                <Header />
              </div>
              <main className="@container flex flex-col bg-white overflow-auto p-4 lg:p-8 gap-8">
                {children}
              </main>
            </div>
          </div>
      </AuthGuard>
    </Providers>
  );
}
