"use client";
import React from "react";
import Field from "@/components2/Field";
import Modal from "@/components2/Modal";
import { Plus } from "lucide-react";
import { useClientStore } from "@/store/user/clientStore";

export default function New() {
  const { create } = useClientStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const project = {
      email: data.email as string,
      firstname: data.firstname as string,
      lastname: data.lastname as string,
      phone: data.tel as string
    };
    await create(project);
  };

  return (
    <Modal
      title="Nouveau Client"
      icon={<Plus />}
      text="Ajouter un Client"
      onSubmit={handleSubmit}
      store={useClientStore}>
      <Field label="Prénom" name="firstname" required />
      <Field label="Nom" name="lastname" required />
      <Field label="Email" name="email" required />
      <Field label="Telephone" name="tel" required />
    </Modal>
  );
}
