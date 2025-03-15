"use client";
import Btn from "@/components/Btn";
import CustomButton from "@/components/CustomButton";
import InConstruction from "@components/InConstruction";
import { InputOtp } from "@heroui/react";
import { useState } from "react";

interface StepVerificationCodeProps {
  onNext: () => void;
  onPrevious: () => void;
}

const RegisterStepTwo = ({ onNext, onPrevious }: StepVerificationCodeProps) => {
  const [value, setValue] = useState("");
  return (
    <>
      <p className="text-neutral-400 text-base sm:text-paragraphMedium pb-4">
        Vous avez reçu un code de validation par SMS, veuillez le saisir
        ci-dessous.
      </p>
      <InConstruction message="Cette fonctionnalité n'est pas disponible pour la démo, vous pouvez passer à l'étape suivante." />
      <label htmlFor="code" className="text-neutral-950 text-base mt-4">
        Code reçu par SMS : *
      </label>
      <InputOtp variant="bordered" length={6} defaultValue={"123456"} value={value} onValueChange={setValue} classNames={{
          base: [
            "w-full",
          ],
          segmentWrapper: [
            "w-full",
          ],
          segment: [
            "w-full",
          ],
        }} />
      {/* <div className="w-full flex flex-row gap-2 mt-2">
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
      </div> */}
      <div className="flex gap-4 w-full mt-4">
        <Btn
          onClick={onPrevious}
          className=""
          variant="light"
          >
          Retour
        </Btn>
        <Btn
          onClick={onNext}
          className="w-full"
          >
          Continuer
        </Btn>
      </div>
    </>
  );
};

export default RegisterStepTwo;
