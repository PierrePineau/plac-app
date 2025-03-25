"use client";
import React from "react";
import Field from "@/components/Field";
import Modal from "@/components/Modal";
import { FileEdit, Plus } from "lucide-react";
import { useClientStore } from "@/store/user/clientStore";

interface EditProps {
  client: Client;
}

export default function Edit({ client }: EditProps) {
  const { update } = useClientStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const client = {
      name: data.name as string,
      email: data.email as string,
      phone: data.phone as string,
      adress: data.adress as string,
      postal_code: data.postal_code as string,
      city: data.city as string
    };
    // await update(id, project);
  };

  return (
    <Modal
      title="Modifier les informations"
      icon={<FileEdit />}
      text={"Modifier les informations"}
      onSubmit={handleSubmit}
      buttonValidationTitle="Modifier"
      store={useClientStore}>
      <Field label="Nom du client" name="name" required />
      <Field label="Email" name="email" required />
      <Field label="Téléphone" name="phone" required />
      <Field label="Adresse" name="adress" required />
      <Field label="Code Postal" name="postal_code" required />
      <Field label="Ville" name="city" required />
    </Modal>
  );
}
