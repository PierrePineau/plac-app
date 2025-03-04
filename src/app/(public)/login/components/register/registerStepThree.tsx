"use client";
import CustomButton from "@/components/custombutton";
import Link from "next/link";
import { useState } from "react";

interface StepUserInfoProps {
  data: { firstName: string; lastName: string; email: string };
  onNext: () => void;
  onPrevious: () => void;
  updateData: (key: string, value: string) => void;
}

const RegisterStepThree = ({
  onNext,
  onPrevious,
  updateData,
  data
}: StepUserInfoProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-neutral-950 text-3xl sm:text-4xl">Inscription</h1>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="w-full">
          <label htmlFor="lastName" className="text-neutral-950 text-base">
            Nom :*
          </label>
          <input
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateData("lastName", e.target.value)}
            placeholder="Ex: Doe"
            className="border rounded w-full px-3 sm:px-4 py-2"
          />
        </div>
        <div className="w-full">
          <label htmlFor="firstName" className="text-neutral-950 text-base">
            Prénom :*
          </label>
          <input
            type="text"
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateData("firstName", e.target.value)}
            placeholder="Ex: John"
            className="border rounded w-full px-3 sm:px-4 py-2"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="email" className="text-neutral-950 text-base">
          Email :*
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
          placeholder="Ex: john.doe@example.com"
          className="border rounded w-full px-3 sm:px-4 py-2 mt-1"
        />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="privacy-policy"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="w-5 h-5 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="privacy-policy" className="text-gray-500 text-sm">
          J’ai pris connaissance et accepte la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="text-blue-500 hover:underline ml-1">
            politique de confidentialité
          </Link>
          .
        </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <CustomButton
          text="Étape précédente"
          color="bg-white"
          textColor="text-neutral-950"
          hover="hover:border-none hover:bg-neutral-100"
          border="border border-neutral-400"
          onClick={onPrevious}
        />
        <CustomButton
          text="Suivant"
          color="bg-brand-950"
          textColor="text-white"
          hover="hover:bg-brand-1000"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default RegisterStepThree;
