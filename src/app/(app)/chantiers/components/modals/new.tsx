"use client";
import React from "react";
import Field from "@components/field";
import Modal from "@components/modal";
import { useProjectStore } from "@/store/user/projectStore";
import { Plus } from "lucide-react";

interface NewProps {
  title: string;
}

export default function New({ title }: NewProps) {
  const { create } = useProjectStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const project = {
      name: data.name as string,
      description: data.desc as string
    };
    await create(project);
  };

  return (
    <Modal
      title="Ajouter un chantier" // Utilisation du titre passé en prop
      icon={<Plus />}
      text={title}
      onSubmit={handleSubmit}
      store={useProjectStore}>
      <Field label="Nom" name="name" required />
      <Field label="Description" name="desc" required />
    </Modal>
  );
}
