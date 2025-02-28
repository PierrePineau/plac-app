"use client";
import React from "react";
import Field from "@/components/field";
import Modal from "@/components/modal";
import { useProjectStore } from "@/store/user/projectStore";
import { FileEdit, Plus } from "lucide-react";

export default function Modify() {
  const { create } = useProjectStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const project = {
      name: data.name as string,
      description: data.desc as string
    };
    // await create(project);
  };

  return (
    <Modal
      title="Modifier les informations"
      icon={<FileEdit />}
      text="Modifier un chantier"
      onSubmit={handleSubmit}
      buttonValidationTitle="Modifier"
      store={useProjectStore}>
      <Field label="Nom du chantier" name="name" required />
      <Field label="Description" name="description" type="textarea" required />
      <div className="flex flex-row gap-4">
        <Field label="Date de début" name="startDate" type="date" required />
        <Field label="Date de fin" name="endDate" type="date" required />
      </div>
      <div className="flex flex-row gap-4">
        <Field label="Chef de chantier" name="chief" required />
        <Field
          label="Statut"
          name="status"
          type="select"
          options={[
            { value: "en_cours", label: "En cours" },
            { value: "termine", label: "Terminé" },
            { value: "annule", label: "Annulé" }
          ]}
          required
        />
      </div>
      <Field label="Adresse" name="adress" required />
      <Field label="Code Postal" name="postal_code" required />
      <Field label="Ville" name="city" required />
    </Modal>
  );
}
