import Btn from "@/components/Btn";
import CustomButton from "@/components/CustomButton";
import Field from "@/components/Field";
import {Button, Form, Input} from "@heroui/react";
import { useState } from "react";

interface StepPhoneNumberProps {
  data: {
    phone: string;
  };
  onNext: () => void;
  updateData: (key: string, value: string) => void;
  // updateData: (value: string) => void;
}

const RegisterStepOne = ({
  onNext,
  updateData,
  data
}: StepPhoneNumberProps) => {
  return (
    <>
      <p className="text-neutral-400 text-base sm:text-paragraphMedium mb-4">
        Vous n'avez pas besoin de renseigner votre carte bancaire.
      </p>
      <Form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        validationBehavior="native"
        >
        <Field
          isRequired
          label="Téléphone"
          errorMessage="Merci de renseigner un numéro de téléphone valide"
          name="phone"
          value={data.phone}
          onChange={(e :any) => updateData("phone", e.target.value)}
          type="tel"
          placeholder="06 12 34 56 78"
          validate={(value :any) => {
              const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
              if (!phoneRegex.test(value)) {
                return "Merci de renseigner un numéro de téléphone valide";
              }
              return null;
            }
          }
          />
        <div className="flex gap-4 w-full mt-4">
          <Btn
            type="submit"
            className="w-full"
            >
            Poursuivre mon inscription
          </Btn>
        </div>
      </Form>
    </>
  );
};

export default RegisterStepOne;
