"use client";
import { useState } from "react";
import LoginForm from "./components/loginForm";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import CustomButton from "@/components/custombutton";

const Login = () => {
  const router = useRouter();
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
  const login = useAuthStore((state) => state.login);
  const handleSubmit = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result) router.push("/");
  };
  const updateSignupData = (key: string, value: string) => {
    setSignupData((prevData) => ({ ...prevData, [key]: value }));
  };
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-neutral-950 text-3xl sm:text-4xl">Connexion</h1>
      <LoginForm
        registerButton={() => setIsSignUp(true)}
        connectButton={handleSubmit}
      />
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <p className="text-neutral-400 text-base sm:text-paragraphMedium">
            Vous n'avez pas de compte ?
          </p>
          <Link
            href="/signup"
            className="text-blue-500 hover:underline ml-1">
            Inscrivez-vous
          </Link>
        </div>
        <div className="block sm:hidden">
          <div className="flex items-center justify-center my-4 w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">OU</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <CustomButton
            text="Se connecter avec Google"
            color="bg-white"
            textColor="text-neutral-950"
            border="border border-neutral-400"
            icon={
              <img
                src="/asset/img/googleLogo.svg"
                alt="Google Calendar"
                width="25"
                height="25"
              />
            }
            hover="hover:border-none hover:bg-neutral-100"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
