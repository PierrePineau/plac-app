"use client";
import Field from "@/components/field";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const FielsetPassword = ({
  passwordHaveErrors,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: {
  passwordHaveErrors: boolean;
  password: string | undefined;
  setPassword: Dispatch<SetStateAction<any>>;
  confirmPassword: string | undefined;
  setConfirmPassword: Dispatch<SetStateAction<any>>;
}) => {
  const errors: { message:string, ok: boolean}[] = [];
  errors.push({
    message: "Au moins 8 caractères",
    ok: (password && password.length >= 8) || false,
  });

  errors.push({
    message: "Une lettre minuscule",
    ok: (password && (password.match(/[a-z]/g) || []).length >= 1) || false,
  });

  errors.push({
    message: "Une lettre majuscule",
    ok: (password && (password.match(/[A-Z]/g) || []).length >= 1) || false,
  });

  errors.push({
    message: "Un chiffre",
    ok: (password && (password.match(/[0-9]/g) || []).length >= 1) || false,
  });
  return (
    <>
      <Field
        isRequired
        label="Mot de passe"
        errorMessage="Certains critères ne sont pas respectés"
        name="password"
        type="password"
        value={password}
        onValueChange={setPassword}
        placeholder="********"
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
    </>
    
  );
};

export default FielsetPassword;
