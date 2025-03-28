"use client";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import { Providers } from "./Providers";
import { AuthGuard } from "@/core/context/AuthContext";
import { useDisclosure } from "@heroui/modal";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <Providers>
      <AuthGuard role="ROLE_USER">
        <div className="flex flex-row w-full h-full grow relative">
          <NavBar isNavOpen={isOpen} onCloseNav={onOpenChange} />
          <div className="flex flex-col w-full">
            <div className="sticky top-0 bg-white z-50 border-b border-neutral-200">
              <Header onToggleNav={onOpen} />
            </div>
            <main className="@container flex flex-col bg-white overflow-auto p-4 lg:p-8 gap-4">
              {children}
            </main>
          </div>
        </div>
      </AuthGuard>
    </Providers>
  );
}
