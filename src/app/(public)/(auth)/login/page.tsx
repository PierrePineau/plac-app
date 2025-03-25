"use client";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import OauthConnect from "../oauth/components/OauthConnect";
import { Alert } from "@heroui/alert";

const Login = () => {
  const router = useRouter();
  const { login, error } = useAuthStore((state) => state);
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const handleSubmit = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result) router.push("/");
  };
  return (
    <>
      <h1 className="text-neutral-950 text-3xl sm:text-4xl">Connexion</h1>
      <LoginForm
        registerButton={() => setIsSignUp(true)}
        connectButton={handleSubmit}
      />
      {error && (
        <Alert color="danger" title="Erreur" type="error">
          {error}
        </Alert>
      )}
      <div className="mt-6">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <p className="text-neutral-400 text-base sm:text-paragraphMedium">
            Vous n'avez pas de compte ?
          </p>
          <Link href="/signup" className="text-blue-500 hover:underline ml-1">
            Inscrivez-vous
          </Link>
        </div>
        <OauthConnect />
      </div>
    </>
  );
};

export default Login;
