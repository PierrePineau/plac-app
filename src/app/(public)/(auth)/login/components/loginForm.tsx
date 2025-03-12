"use client";
import { useState } from "react";
import CustomButton from "@components/custombutton";
import Btn from "@components/btn";
import Link from "next/link";
import { Form } from "@heroui/react";
import Field from "@components/field";
import { Search } from "lucide-react";

interface LoginFormProps {
  registerButton: () => void;
  connectButton: (email: string, password: string) => void;
}

const LoginForm = ({ registerButton, connectButton }: LoginFormProps) => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email || !password) {
      setIsSubmitting(false);
      return;
    }
    await connectButton(email, password);
    setIsSubmitting(false);
  };
  return (
    <div className="mt-6">
      <Form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        validationBehavior="native"
        >
        <Field
          isRequired
          label="Email"
          errorMessage="Veuillez renseigner votre email"
          name="email"
          value={email}
          onChange={(e :any) => setEmail(e.target.value)}
          type="email"
          />
        <Field
          isRequired
          label="Mot de passe"
          errorMessage="Veuillez renseigner votre mot de passe"
          name="password"
          value={password}
          onChange={(e :any) => setPassword(e.target.value)}
          type="password"
          />
        <Link
            href="/forgot-password"
            className="text-neutral-400 hover:underline ml-auto">
            Mot de passe oublié ?
          </Link>
        <div className="flex gap-4 w-full mt-4">
          <Btn
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            >
            Connexion
          </Btn>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
