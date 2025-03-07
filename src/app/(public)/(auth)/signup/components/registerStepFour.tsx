"use client";
import Btn from "@/components/btn";
import Field from "@/components/field";
import { Form } from "@heroui/react";
import { Check } from "lucide-react";
import { useState } from "react";

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
  const errors: { message:string, ok: boolean}[] = [];

  const [passwordHaveErrors, setHaveErrors] = useState(false);

  errors.push({
    message: "Au moins 8 caractères",
    ok: password.length >= 8,
  });

  errors.push({
    message: "Une lettre minuscule",
    ok: (password.match(/[a-z]/g) || []).length >= 1,
  });

  errors.push({
    message: "Une lettre majuscule",
    ok: (password.match(/[A-Z]/g) || []).length >= 1,
  });

  errors.push({
    message: "Un chiffre",
    ok: (password.match(/[0-9]/g) || []).length >= 1,
  });

  return (
    <>
      <p className="text-neutral-400 text-base sm:text-paragraphMedium mb-4">
        Vous n'avez pas besoin de renseigner votre carte bancaire.
      </p>
      <Form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          let someErrors = errors.filter((error) => {
            return !error.ok;
          });
          setHaveErrors(someErrors.length > 0);
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
        <Field
          isRequired
          label="Mot de passe"
          errorMessage="Certains critères ne sont pas respectés"
          name="password"
          type="password"
          value={password}
          onValueChange={setPassword}
          placeholder="********"
          isInvalid={passwordHaveErrors}
          validate={(value:any) => {
            let someErrors = errors.filter((error) => {
              return !error.ok;
            });
            // Si l'utilisateur n'a pas rempli le champ
            if (passwordHaveErrors || (someErrors.length > 0 && errors.length != someErrors.length)) {
              return false;
            }
            return true;
          }}
          />
        <Field
          isRequired
          label="Confirmez le mot de passe"
          errorMessage="Les mots de passe ne correspondent pas"
          name="confirmPassword"
          value={confirmPassword}
          onValueChange={setConfirmPassword}
          type="password"
          placeholder="********"
          validate={(value:any) => {
            if (value !== password) {
              return false;
            }
            return true;
          }}
          />
        <ul className="flex flex-col gap-2">
          <li className="text-neutral-400 mb-2">Le mot de passe doit respecter les critères suivants :</li>
          {errors.map((error, index) => (
            <li key={index} className={`${error.ok ? "text-success-500" : "text-neutral-400"} text-neutral-400 inline-flex gap-4`}>
              <span className={`${error.ok ? "bg-success-500" : "bg-neutral-400"} rounded-full h-6 w-6 inline-flex justify-center items-center`}><Check color="white" size={14}/></span>
              {error.message}
            </li>
          ))}
        </ul>
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
