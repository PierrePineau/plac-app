"use client";
import { AuthGuard } from "../(app)/guard/authGuard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./components/navBar";
import Header from "./components/header";

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
        <div className="flex flex-row bg-white h-full">
            <div className="sticky bg-white hidden md:block border-r border-neutral-200">
              <NavBar />
            </div>
            <div className="flex flex-col w-full">
              <div className="top-0 bg-white z-10 border-b border-neutral-200">
                <Header />
              </div>
              {children}
            </div>
        </div>
    </AuthGuard>
  );
}
