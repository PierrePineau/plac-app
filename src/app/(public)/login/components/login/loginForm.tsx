"use client";

import { useState } from "react";
import CustomButton from "@/components/custombutton";

interface LoginFormProps {
  registerButton: () => void;
  connectButton: (email: string, password: string) => void;
}

const LoginForm = ({ registerButton, connectButton }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    connectButton(email, password);
  };

  return (
    <div>
      <div className="items-start gap-8 flex flex-col">
        <h1 className="text-neutral-950 font-satoshi text-4xl">Connexion</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="mail"
              className="font-satoshi text-paragraphMedium text-neutral-950">
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
              className="font-satoshi text-paragraphMedium text-neutral-950">
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
          <button
            type="submit"
            className="w-full bg-brand-950 text-white px-4 py-2 rounded-md hover:bg-brand-1000">
            Connexion
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center pt-4 gap-4">
        <p className="font-satoshi text-neutral-400 text-paragraphMedium">
          Mot de passe oublié
        </p>
        <div className="flex flex-row gap-2 justify-start items-start">
          <p className="font-satoshi text-neutral-400 text-paragraphMedium">
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
      <div className="flex items-center justify-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">OU</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="w-full flex justify-center">
        <CustomButton
          text="Se connecter avec Google"
          color="bg-white"
          textColor="text-neutral-950"
          border="border border-neutral-400"
          icon={
            <img
              src="/asset/img/googleLogo.svg"
              alt="Google Calendar"
              width="25"
              height="25"
            />
          }
          hover="hover:border-none hover:bg-neutral-100"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default LoginForm;
