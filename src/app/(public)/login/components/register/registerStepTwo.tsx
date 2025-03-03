"use client";
import CustomButton from "@/components/custombutton";

interface StepVerificationCodeProps {
  onNext: () => void;
  onPrevious: () => void;
}

const RegisterStepTwo = ({ onNext, onPrevious }: StepVerificationCodeProps) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-neutral-950 text-3xl sm:text-4xl">Inscription</h1>
        <p className="text-neutral-400 text-base sm:text-paragraphMedium">
          Vous avez reçu un code de validation par SMS, veuillez le saisir
          ci-dessous.
        </p>
      </div>
      <label htmlFor="code" className="text-neutral-950 text-base mt-4">
        Code reçu par SMS : *
      </label>
      <div className="w-full flex flex-row gap-2 mt-2">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              placeholder="3"
              className="w-10 sm:w-12 border border-neutral-200 text-center rounded-md py-2 px-1 sm:px-3"
            />
          ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
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

export default RegisterStepTwo;
