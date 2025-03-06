"use client";
import Btn from "@/components/btn";
import CustomButton from "@/components/custombutton";
import Field from "@/components/field";
import { Checkbox, Form } from "@heroui/react";
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
  const [errors, setErrors] = useState<{ terms?: string }>({});
  return (
    <>
      <p className="text-neutral-400 text-base sm:text-paragraphMedium mb-4">
        Vous n'avez pas besoin de renseigner votre carte bancaire.
      </p>
      <Form
        className="flex flex-col gap-4"
        validationErrors={errors}
        onSubmit={(e) => {
          e.preventDefault();
          if (!isChecked) {
            console.log("isChecked", isChecked);
            setErrors({ terms: "Vous devez accepter les conditions d'utilisation" });
            return;
          }
          onNext();
        }}
        validationBehavior="native"
        >
        <div className="flex gap-4">
          <Field
            isRequired
            label="Nom"
            errorMessage="Merci de renseigner votre nom"
            name="lastName"
            value={data.lastName}
            onChange={(e :any) => updateData("lastName", e.target.value)}
            />
          <Field
            isRequired
            label="Prénom"
            errorMessage="Merci de renseigner votre prénom"
            name="firstName"
            value={data.firstName}
            onChange={(e :any) => updateData("firstName", e.target.value)}
            />
        </div>
        <Field
          isRequired
          label="Email"
          errorMessage="Merci de renseigner une adresse email valide"
          name="email"
          value={data.email}
          onChange={(e :any) => updateData("email", e.target.value)}
          type="email"
          />
        <Checkbox
          isRequired
          classNames={{
            label: "text-small",
          }}
          isInvalid={!!errors.terms}
          name="terms"
          value="true"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          validationBehavior="aria"
        >
          J’ai pris connaissance et accepte la 
          <Link
            href="/politique-de-confidentialite"
            className="text-blue-500 hover:underline ml-1">
            politique de confidentialité
          </Link>
          .
        </Checkbox>
        {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}
        <div className="flex gap-4 w-full mt-4">
          <Btn
            onClick={onPrevious}
            variant="light"
            >
            Retour
          </Btn>
          <Btn
            type="submit"
            className="w-full"
            >
            Continuer
          </Btn>
        </div>
      </Form>
    </>
  );
};

export default RegisterStepThree;
