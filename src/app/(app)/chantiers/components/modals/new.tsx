"use client";
import React from "react";
import Field from "@/components/field";
import Modal from "@/components/modal";
import { useProjectStore } from "@/store/user/projectStore";
import { Plus } from "lucide-react";

export default function New() {
  const { create } = useProjectStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const project = {
      name: data.name as string,
      description: data.desc as string
    };
    console.log("duyzy");
    await create(project);
  };

  return (
    <Modal
      title="Nouveau chantier"
      icon={<Plus />}
      text="Ajouter un chantier"
      onSubmit={handleSubmit}
      store={useProjectStore}>
      <Field label="Nom" name="name" required />
      <Field label="Description" name="desc" required />
    </Modal>
  );
}
