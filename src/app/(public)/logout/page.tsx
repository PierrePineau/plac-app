"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import SplashScreen from "@/components/splashscreen";

const Logout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    logout();
    router.push("/login");
  }, [router]);

  return <SplashScreen />;
};

export default Logout;
