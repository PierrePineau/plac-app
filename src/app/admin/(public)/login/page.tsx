"use client";
import { useState } from "react";
import LoginForm from "./components/login/loginForm";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin/adminAuthStore";

const Login = () => {
  const router = useRouter();
  const { adminToken } = useAdminAuthStore();
  const login = useAdminAuthStore((state) => state.loginAdmin);
  const [error, setError] = useState("");

  const handleSubmit = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result) {
      router.push("/admin");
    } else {
      setError("Identifiants invalides. Essayez à nouveau.");
    }
  };

  return (
    <div className="flex h-full w-full grow">
      <div className="flex flex-row w-full">
        <div className="bg-brand-950 flex flex-col w-1/2">
          <div className="flex flex-col px-20 py-10 justify-start items-start gap-20">
            <img
              className="w-auto h-8"
              src="/asset/img/whiteLogo.svg"
              alt="Logo Plac"
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-neutral-50 font-satoshi text-5xl">
                Gérer vos chantiers plus facilement
              </h1>
              <p className="text-brand-850 font-satoshi text-paragraphMedium">
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                Lorem ipsum Lorem ipsum Lorem ipsum
              </p>
            </div>
          </div>
          <img
            className="flex w-full pl-20"
            src="/asset/img/landingPage.png"
            alt="Logo Plac"
          />
        </div>
        <div className="bg-white w-1/2 px-20 py-10 gap-8 flex flex-col justify-center">
          <LoginForm connectButton={handleSubmit} />
          {error && (
            <p className="text-negative-600 flex justify-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
