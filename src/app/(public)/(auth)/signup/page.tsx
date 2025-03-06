"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import RegisterStepOne from "../signup/components/registerStepOne";
import RegisterStepTwo from "../signup/components/registerStepTwo";
import RegisterStepThree from "../signup/components/registerStepThree";
import RegisterStepFour from "../signup/components/registerStepFour";
import Btn from "@/components/btn";
import Link from "next/link";
import OauthConnect from "../oauth/components/OauthConnect";

const SignUp = () => {
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
            data={{
              password: signupData.password,
              confirmPassword: signupData.confirmPassword,
              email: signupData.email
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
            onClick={() => setCurrentStep(currentStep - 1)}
            >
            Prev step dev
          </Btn>
          <Btn
            variant=""
            className="bg-danger-500 text-white"
            onClick={() => setCurrentStep(currentStep + 1)}
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
