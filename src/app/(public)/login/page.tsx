"use client";
import { useState } from "react";
import RegisterStepOne from "./components/register/registerStepOne";
import RegisterStepTwo from "./components/register/registerStepTwo";
import RegisterStepThree from "./components/register/registerStepThree";
import RegisterStepFour from "./components/register/registerStepFour";
import LoginForm from "./components/login/loginForm";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const Login = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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
    <div className="min-h-screen flex flex-col sm:flex-row">
      <div className="bg-brand-950 p-6 flex flex-col items-center sm:items-start sm:w-1/2">
        <img src="/asset/img/whiteLogo.svg" alt="Logo Plac" className="h-8" />
        <h1 className="text-neutral-50 text-3xl sm:text-5xl mt-4 text-center sm:text-left">
          Gérer vos chantiers plus facilement
        </h1>
        <p className="text-brand-850 text-base sm:text-paragraphMedium mt-2 text-center sm:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
        <img
          src="/asset/img/landingPage.png"
          alt="Illustration"
          className="w-full mt-4 object-cover"
        />
      </div>
      <div className="bg-white flex-1 p-6 sm:px-20 sm:py-10 flex flex-col justify-center">
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
  );
};

export default Login;
