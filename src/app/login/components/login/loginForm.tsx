"use client";

import CustomButton from "@/app/components/custombutton";

interface LoginForm {
  registerButton: () => void;
  connectButton: () => void;
}

const LoginForm = ({ registerButton, connectButton }: LoginForm) => {
  return (
    <div>
      <div className="items-start gap-8 flex flex-col">
        <h1 className="text-neutral-950 font-satoshi text-4xl">Connexion</h1>
        <form className="flex flex-col gap-4 w-full">
          <div>
            <label
              htmlFor="name"
              className=" font-satoshi text-paragraphMedium text-neutral-950">
              Numéro de téléphone *
            </label>
            <input
              type="text"
              id="name"
              className=" flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="Ex: 06 78 09 56 43"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className=" font-satoshi text-paragraphMedium text-neutral-950">
              Mot de passe *
            </label>
            <input
              type="password"
              id="name"
              className=" flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            onClick={connectButton}
            className="w-full bg-brand-950 text-white px-4 py-2 rounded-md hover:bg-brand-1000">
            Connexion
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center pt-4">
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
    </div>
  );
};

export default LoginForm;
