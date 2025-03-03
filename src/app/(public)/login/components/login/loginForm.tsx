"use client";
import { useState } from "react";
import CustomButton from "@/components/custombutton";
import Btn from "@/components/btn";

interface LoginFormProps {
  registerButton: () => void;
  connectButton: (email: string, password: string) => void;
}

const LoginForm = ({ registerButton, connectButton }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await connectButton(email, password);
    setIsSubmitting(false);
  };
  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 items-center sm:items-start">
        <h1 className="text-neutral-950 font-bold text-2xl sm:text-4xl">
          Connexion
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="mail"
              className="text-neutral-950 text-sm sm:text-base mb-1">
              Email *
            </label>
            <input
              type="email"
              id="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-neutral-200 rounded text-neutral-950 h-10 sm:h-11 p-2 sm:p-3"
              placeholder="Ex: johndoe@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-neutral-950 text-sm sm:text-base mb-1">
              Mot de passe *
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-neutral-200 rounded text-neutral-950 h-10 sm:h-11 p-2 sm:p-3"
              placeholder="********"
            />
          </div>
          <Btn type="submit" isLoading={isSubmitting}>
            Connexion
          </Btn>
        </form>
      </div>
      <div className="flex flex-col justify-center gap-3 mt-4 items-center">
        <p className="text-neutral-400 text-sm sm:text-base">
          Mot de passe oublié
        </p>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-neutral-400 text-sm sm:text-base">
            Vous n'avez pas de compte ?
          </p>
          <Btn onClick={registerButton} className="" variant="light">
            S'inscrire
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
