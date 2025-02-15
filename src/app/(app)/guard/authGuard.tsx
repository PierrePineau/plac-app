"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({
  children,
  authTarget
}: {
  children: React.ReactNode;
  authTarget: "admin" | "user";
}) {
  const router = useRouter();
  useEffect(() => {
    const tokenKey = authTarget === "admin" ? "adminToken" : "userToken";
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      router.push(authTarget === "admin" ? "/admin/login" : "/login");
    }
  }, [authTarget, router]);
  return <>{children}</>;
}
