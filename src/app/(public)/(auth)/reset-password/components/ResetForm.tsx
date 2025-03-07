"use client";
import { useEffect, useState } from "react";
import Btn from "@/components/btn";
import { Alert, Form } from "@heroui/react";
import Field from "@/components/field";
import FielsetPassword from "../../components/FielsetPassword";

const ResetForm = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordHaveErrors, setHaveErrors] = useState(false);
  const [token, setToken] = useState("");
  const [tokenNotFound, setTokenNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitting(true);

    // TODO: Call API


    // setIsSubmitting(false);
  };

  useEffect(() => {
    // On récupère l'email de l'utilisateur
    const params = new URLSearchParams(window.location.search);
    // On récupère le token de l'utilisateur
    const token = params.get("token");
    if (!token) {
      setTokenNotFound(true);
    }else{
      setToken(token);
    }
  }, []);

  return (

    <div className="mt-6">
      {
        tokenNotFound && (
          <Alert
            variant={"bordered"}
            color="danger"
            description={"Le lien de réinitialisation est invalide"}
            className="mb-4"
          />
        )
      }
      {
        isSubmitting && (
          <Alert
            variant={"bordered"}
            color="primary"
            description={"La réinitialisation n'est pas encore implémentée pour la démo"}
            className="mb-4"
          />
        )
      }
      <Form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        validationBehavior="native"
        >
        <FielsetPassword
          passwordHaveErrors={passwordHaveErrors}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <div className="flex gap-4 w-full mt-4">
          <Btn
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            >
            Réinitialiser
          </Btn>
        </div>
      </Form>
    </div>
  );
};

export default ResetForm;
