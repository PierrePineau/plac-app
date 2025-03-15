"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import RegisterStepOne from "./components/RegisterStepOne";
import RegisterStepTwo from "./components/RegisterStepTwo";
import RegisterStepThree from "./components/RegisterStepThree";
import RegisterStepFour from "./components/RegisterStepFour";
import Btn from "@/components/Btn";
import Link from "next/link";
import OauthConnect from "../oauth/components/OauthConnect";
import { useUserStore } from "@/store/user/userStore";

const SignUp = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { create } = useUserStore();
  const { authenticateUserByToken } = useAuthStore();
  const handleRegister = async (data: {
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    // setIsLoading(true);
    const response = await create(data);

    if (response) {
      const token = (response as any).token;

      // On authentifie l'utilisateur via le token
      const isAuth = await authenticateUserByToken(token);
      if (isAuth) {
        router.push("/");
      }
    }
    
  }
  const updateSignupData = (key: string, value: string) => {
    setSignupData((prevData) => ({ ...prevData, [key]: value }));
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <RegisterStepOne
              onNext={() => setCurrentStep(2)}
              updateData={(key, value) => updateSignupData(key, value)}
              data={{ phone: signupData.phone }}
            />
          </>
        );
      case 2:
        return (
          <RegisterStepTwo
            onNext={() => setCurrentStep(3)}
            onPrevious={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <RegisterStepThree
            onNext={() => setCurrentStep(4)}
            onPrevious={() => setCurrentStep(2)}
            updateData={(key, value) => updateSignupData(key, value)}
            data={{
              firstName: signupData.firstName,
              lastName: signupData.lastName,
              email: signupData.email
            }}
          />
        );
      case 4:
        return (
          <RegisterStepFour
            onPrevious={() => setCurrentStep(3)}
            updateData={(key, value) => updateSignupData(key, value)}
            handleRegister={handleRegister}
            data={{
              password: signupData.password,
              confirmPassword: signupData.confirmPassword,
              email: signupData.email,
              phone: signupData.phone,
              firstName: signupData.firstName,
              lastName: signupData.lastName
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <h1 className="text-neutral-950 font-medium text-3xl sm:text-4xl mb-2">Inscription</h1>
      {renderStep()}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <p className="text-neutral-400 text-base sm:text-paragraphMedium">
            Déjà un compte ?
          </p>
          <Link
            href="/login"
            className="text-blue-500 hover:underline ml-1">
            Se connecter
          </Link>
        </div>
        <div className="flex gap-4 justify-center w-full mt-4">
        <Btn
            variant=""
            className="bg-danger-500 text-white"
            onClick={() => setCurrentStep(currentStep > 1 ? currentStep - 1 : 1)}
            >
            Prev step dev
          </Btn>
          <Btn
            variant=""
            className="bg-danger-500 text-white"
            onClick={() => setCurrentStep(currentStep < 4 ? currentStep + 1 : 4)}
            >
            Next step dev
          </Btn>
        </div>
        <OauthConnect />
      </div>
    </>
  );
};

export default SignUp;
