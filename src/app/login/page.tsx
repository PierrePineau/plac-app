"use client";
import { useState } from "react";
import RegisterStepOne from "./components/register/registerStepOne";
import RegisterStepTwo from "./components/register/registerStepTwo";
import RegisterStepThree from "./components/register/registerStepThree";
import RegisterStepFour from "./components/register/registerStepFour";
import LoginForm from "./components/login/loginForm";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/user/useAuthStore";

const Login = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { user, error, isLoading } = useAuthStore();
  const [signupData, setSignupData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (email: string, password: string) => {
    await login(email, password);
    router.push("/home");
  };

  const updateSignupData = (key: string, value: string) => {
    setSignupData((prevData) => ({ ...prevData, [key]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegisterStepOne
            onNext={() => setCurrentStep(2)}
            onReturnToLogin={() => setIsSignUp(false)}
            updateData={(value) => updateSignupData("phoneNumber", value)}
            data={signupData.phoneNumber}
          />
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
              confirmPassword: signupData.confirmPassword
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full">
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
          {isSignUp ? (
            renderStep()
          ) : (
            <LoginForm
              registerButton={() => setIsSignUp(true)}
              connectButton={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
