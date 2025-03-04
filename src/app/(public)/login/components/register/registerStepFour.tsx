"use client";
import CustomButton from "@/components/custombutton";

interface StepFourProps {
  onPrevious: () => void;
  data: { password: string; confirmPassword: string };
  updateData: (key: string, value: string) => void;
}

const RegisterStepFour = ({ onPrevious, data, updateData }: StepFourProps) => {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-neutral-950 text-3xl sm:text-4xl">Inscription</h1>
      <div className="mt-4">
        <label htmlFor="password" className="text-neutral-950 text-base">
          Créez un mot de passe :
        </label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={(e) => updateData("password", e.target.value)}
          placeholder="********"
          className="border rounded w-full px-3 sm:px-4 py-2 mt-1"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="confirmPassword" className="text-neutral-950 text-base">
          Confirmez le mot de passe :
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={data.confirmPassword}
          onChange={(e) => updateData("confirmPassword", e.target.value)}
          placeholder="********"
          className="border rounded w-full px-3 sm:px-4 py-2 mt-1"
        />
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
          text="Terminer"
          color="bg-brand-950"
          textColor="text-white"
          hover="hover:bg-brand-1000"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default RegisterStepFour;
