"use client";
import React, { useState } from "react";
import Field from "@/components/Field";
import Modal from "@/components/Modal";
import { useProjectStore } from "@/store/user/projectStore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert } from "@heroui/alert";

export default function New() {
  const router = useRouter();
  const { create, error } = useProjectStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const project = await create({
      name: data.name as string,
      description: data.description as string,
    });
    if (project) {
      router.push(`/chantiers/${project.id}`);
    }
  };

  return (
    <Modal
      title="Ajouter un chantier"
      subtitle="Renseignez les informations sur votre chantier (modifiables par la suite)"
      icon={<Plus />}
      text="Ajouter un chantier"
      onSubmit={handleSubmit}
      store={useProjectStore}>
      <Field label="Nom du chantier" name="name" isRequired />
      <Field label="Description" type="textarea" name="description" />
      {error && <Alert color="danger">{error}</Alert>}
    </Modal>
  );
}
