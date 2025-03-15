'use client';
import { AuthProvider } from "@/core/context/AuthContext";
import { LoaderProvider } from "@/core/context/LoaderContext";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LoaderProvider>
      {children}
      </LoaderProvider>
    </AuthProvider>
  )
}