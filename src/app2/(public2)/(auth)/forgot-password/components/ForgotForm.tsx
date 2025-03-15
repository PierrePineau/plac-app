"use client";
import { useState } from "react";
import Btn from "@/components2/Btn";
import { Form } from "@heroui/react";
import Field from "@/components2/Field";

const ForgotForm = () => {
  const [email, setEmail] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email) {
      setIsSubmitting(false);
      return;
    }

    // TODO: Call API


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

export default ForgotForm;
