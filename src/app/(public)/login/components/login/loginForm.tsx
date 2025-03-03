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
    <>
      <div className="sm:hidden p-4">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-neutral-950 text-2xl font-bold">Connexion</h1>
          <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="mail" className="text-neutral-950 text-sm mb-1">
                Email *
              </label>
              <input
                type="email"
                id="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 p-2 border border-neutral-200 rounded text-neutral-950"
                placeholder="Ex: johndoe@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-neutral-950 text-sm mb-1">
                Mot de passe *
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 p-2 border border-neutral-200 rounded text-neutral-950"
                placeholder="********"
              />
            </div>
            <Btn type="submit" isLoading={isSubmitting} onClick={() => {}}>
              Connexion
            </Btn>
          </form>
        </div>
        <div className="flex flex-col items-center gap-3 mt-4">
          <p className="text-neutral-400 text-sm">Mot de passe oublié</p>
          <div className="flex flex-row items-center gap-2">
            <p className="text-neutral-400 text-sm">
              Vous n'avez pas de compte ?
            </p>
            <CustomButton
              text="S'inscrire"
              color="bg-white"
              textColor="text-brand-500"
              padding=""
              hover="hover:text-brand-600"
              onClick={registerButton}
            />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="items-start gap-8 flex flex-col">
          <h1 className="text-neutral-950 text-4xl">Connexion</h1>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="mail"
                className="text-paragraphMedium text-neutral-950">
                Email *
              </label>
              <input
                type="email"
                id="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded text-neutral-950"
                placeholder="Ex: johndoe@gmail.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-paragraphMedium text-neutral-950">
                Mot de passe *
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded text-neutral-950"
                placeholder="********"
              />
            </div>
            <Btn type="submit" isLoading={isSubmitting} onClick={() => {}}>
              Connexion
            </Btn>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center pt-4 gap-4">
          <p className="text-neutral-400 text-paragraphMedium">
            Mot de passe oublié
          </p>
          <div className="flex flex-row gap-2 justify-start items-start">
            <p className="text-neutral-400 text-paragraphMedium">
              Vous n'avez pas de compte ?
            </p>
            <CustomButton
              text="S'inscrire"
              color="bg-white"
              textColor="text-brand-500"
              padding=""
              hover="hover:text-brand-600"
              onClick={registerButton}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
