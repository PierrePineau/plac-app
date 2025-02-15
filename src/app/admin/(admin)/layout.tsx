"use client";
import { AuthGuard } from "../../(app)/guard/authGuard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/header";
import NavBar from "./components/navBar";

// export const metadata = {
//   title: 'Plac',
//   description: 'Application de gestion de chantiers',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);
  
  return (
    <AuthGuard authTarget="admin">
        <div className="flex flex-row bg-white h-full grow">
            <div className="sticky bg-white hidden md:block border-r border-neutral-200">
              <NavBar />
            </div>
            <div className="flex flex-col w-full">
              <div className="top-0 bg-white z-10 border-b border-neutral-200">
                <Header />
              </div>
              <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
                {children}
              </div>
            </div>
        </div>
    </AuthGuard>
  );
}
