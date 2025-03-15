"use client";
import React from "react";
import Field from "@components/field";
import Modal from "@components/Modal";
import { useProjectStore } from "@/store/user/projectStore";
import { FileEdit, Plus } from "lucide-react";
import { useClientStore } from "@/store/user/clientStore";

interface ModifyProps {
  id: string;
}

export default function Modify({ id }: ModifyProps) {
  const { update } = useClientStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const client = {
      lastname: data.lastname as string,
      firstname: data.firstname as string,
      email: data.email as string,
      phone: data.tel as string
    };
    await update(id, client);
  };

  return (
    <Modal
      title="Modifier les informations du client"
      icon={<FileEdit />}
      text="Modifier le client"
      onSubmit={handleSubmit}
      buttonValidationTitle="Modifier"
      store={useProjectStore}>
      <Field label="Nom de famille" name="lastname" required />
      <Field label="Prénom" name="firstname" required />
      <Field label="Addresse email" name="email" required />
      <Field label="Numéro de téléphone" name="tel" required />
    </Modal>
  );
}
