"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ForgotForm from "./components/ForgotForm";

const Forgot = () => {
  const router = useRouter();
  
  return (
    <>
      <h1 className="text-neutral-950 font-medium text-3xl sm:text-4xl mb-2">
        Mot de passe oublié
      </h1>
      <p className="text-neutral-500 text-base sm:text-paragraphMedium">
        Entrez votre adresse email pour réinitialiser votre mot de passe, un lien de réinitialisation vous sera envoyé par email.
      </p>
      <ForgotForm />
      <div className="mt-4">
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          {/* <p className="text-neutral-400 text-base sm:text-paragraphMedium">
            Déjà un compte ?
          </p> */}
          <Link
            href="/login"
            className="text-blue-500 hover:underline ml-1">
            Se connecter
          </Link>
        </div>
      </div>
    </>
  );
};

export default Forgot;
