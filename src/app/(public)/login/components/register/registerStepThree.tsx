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
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-neutral-950   text-4xl">Inscription</h1>
      <div className="flex flex-row gap-4">
        <div className="w-full">
          <label htmlFor="name" className="text-neutral-950">
            Nom :*
          </label>
          <input
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateData("lastName", e.target.value)}
            className="border rounded w-full px-4 py-2   text-paragraphMedium text-neutral-950"
            placeholder="Ex: Doe"
          />
        </div>
        <div className="w-full">
          <label htmlFor="name" className="text-neutral-950">
            Prénom :*
          </label>
          <input
            type="text"
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateData("firstName", e.target.value)}
            className="border rounded w-full px-4 py-2   text-paragraphMedium text-neutral-950"
            placeholder="Ex: John"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-neutral-950">
          Email :*
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
          className="border rounded w-full px-4 py-2   text-paragraphMedium text-neutral-950"
          placeholder="Ex: john.doe@example.com"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="privacy-policy"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="w-5 h-5 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="privacy-policy" className="text-gray-500">
          J’ai pris connaissance et accepte la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="text-blue-500 hover:underline">
            politique de confidentialité
          </Link>
          .
        </label>
      </div>
      <div className="w-full flex flex-row gap-4">
        <CustomButton
          text="Étape précédente"
          color="bg-white w-full"
          textColor="text-neutral-950"
          hover="hover:border-none hover:bg-neutral-100"
          border="border border-neutral-400"
          onClick={onPrevious}
        />
        <CustomButton
          text="Suivant"
          color="bg-brand-950 w-full"
          textColor="text-white"
          hover="hover:bg-brand-1000"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default RegisterStepThree;
