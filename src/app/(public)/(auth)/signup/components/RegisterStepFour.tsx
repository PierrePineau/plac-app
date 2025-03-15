"use client";
import Btn from "@/components/Btn";
import Field from "@/components/Field";
import { Form } from "@heroui/react";
import { useState } from "react";
import FielsetPassword from "../../components/FielsetPassword";

interface StepFourProps {
  onPrevious: () => void;
  data: { password: string; confirmPassword: string, email: string, phone: string, firstName: string, lastName: string };
  updateData: (key: string, value: string) => void;
  handleRegister: (data: { phone: string; firstName: string; lastName: string; email: string; password: string }) => void;
}

const RegisterStepFour = ({
  onPrevious,
  data,
  updateData,
  handleRegister,
}: StepFourProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(data.password);
  const [confirmPassword, setConfirmPassword] = useState(data.confirmPassword);
  // const errors: { message:string, ok: boolean}[] = [];
  const [passwordHaveErrors, setHaveErrors] = useState(false);
  return (
    <>
      <p className="text-neutral-400 text-base sm:text-paragraphMedium mb-4">
        Vous n'avez pas besoin de renseigner votre carte bancaire.
      </p>
      <Form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          // let someErrors = errors.filter((error) => {
          //   return !error.ok;
          // });
          // setHaveErrors(someErrors.length > 0);
          setIsLoading(true);
          handleRegister({
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: password,
          });
          setIsLoading(false);
        }}
        validationBehavior="native"
        >
        <Field
          isRequired
          label="Email"
          name="email"
          type="email"
          className=""
          value={data.email}
          onChange={(e :any) => updateData("email", e.target.value)}
          />
        <FielsetPassword
          passwordHaveErrors={passwordHaveErrors}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <div className="flex gap-4 w-full mt-4">
          <Btn
            variant="light"
            className="flex-shrink-0"
            onClick={onPrevious}
            >
            Précédent
          </Btn>
          <Btn
            isLoading={isLoading}
            type="submit"
            className="w-full"
            >
            Terminer mon inscription 
          </Btn>
        </div>
        
      </Form>
    </>
  );
};

export default RegisterStepFour;
