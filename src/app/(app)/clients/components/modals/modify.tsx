"use client";
import React from "react";
import Field from "@/components/field";
import Modal from "@/components/modal";
import { useProjectStore } from "@/store/user/projectStore";
import { FileEdit, Plus } from "lucide-react";

interface ModifyProps {
  id: string;
}

export default function Modify({ id }: ModifyProps) {
  const { update } = useProjectStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const project = {
      name: data.name as string,
      description: data.description as string,
      startDate: data.startDate as String,
      endDate: data.endDate as String,
      chief: data.chief as String,
      status: data.status,
      adress: data.adress as String,
      postal_code: data.postal_code as String,
      city: data.city as String
    };
    // await update(id, project);
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
