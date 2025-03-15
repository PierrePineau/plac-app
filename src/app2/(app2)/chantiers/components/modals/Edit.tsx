"use client";
import React from "react";
import Field from "@/components2/Field";
import Modal from "@/components2/Modal";
import { useProjectStore } from "@/store/user/projectStore";
import { FileEdit, Plus } from "lucide-react";

interface EditProps {
  project: Project;
}

export default function Edit({ project }: EditProps) {
  const { update } = useProjectStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const project = {
      name: data.name as string,
      description: data.description as string,
      startDate: data.startDate as string,
      endDate: data.endDate as string,
      chief: data.chief as string,
      status: data.status,
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
      store={useProjectStore}>
      <Field label="Nom du chantier" name="name" isRequired />
      <Field label="Description" name="description" type="textarea" />
      <div className="flex flex-row gap-4">
        <Field label="Date de début" name="startDate" type="date" />
        <Field label="Date de fin" name="endDate" type="date" />
      </div>
      <div className="flex flex-row gap-4">
        <Field label="Chef de chantier" name="chief" />
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
