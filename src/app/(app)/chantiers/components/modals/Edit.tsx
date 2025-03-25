"use client";
import React from "react";
import Field from "@/components/Field";
import Modal from "@/components/Modal";
import { useProjectStore } from "@/store/user/projectStore";
import { FileEdit, Plus } from "lucide-react";

interface EditProps {
  project: Project;
}

export default function Edit({ project }: EditProps) {
  const { update } = useProjectStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const projectUpdate: Partial<Project> = {
      name: data.name as string,
      description: data.description as string,
      startAt: new Date(data.startDate as string),
      endAt: new Date(data.endDate as string)
      // chief: data.chief as string,
      // status: data.status,
      // adress: data.adress as string,
      // postal_code: data.postal_code as string,
      // city: data.city as string
    };
    // await update(project.id, projectUpdate);
  };

  return (
    <Modal
      title="Modifier les informations"
      icon={<FileEdit />}
      text={"Modifier les informations"}
      onSubmit={handleSubmit}
      buttonValidationTitle="Modifier"
      store={useProjectStore}>
      <Field
        label="Nom du chantier"
        name="name"
        defaultValue={project.name}
        isRequired
      />
      <Field
        label="Description"
        name="description"
        defaultValue={project.description}
        type="textarea"
      />
      <div className="flex flex-row gap-4">
        <Field
          label="Date de début"
          name="startDate"
          defaultValue={project.startAt}
          type="date"
        />
        <Field
          label="Date de fin"
          name="endDate"
          defaultValue={project.endAt}
          type="date"
        />
      </div>
      <div className="flex flex-row gap-4">
        <Field
          label="Chef de chantier"
          defaultValue={project.organisation?.owner}
          name="chief"
        />
        {/* <Field
          label="Statut"
          name="status"
          type="select"
          options={[
            {
              label: "En cours",
              value: "en_cours"
            },
            {
              label: "Terminé",
              value: "termine"
            },
            { 
              label: "Annulé",
              value: "annule"
            }
          ]}
          selectedKeys={project.status?.code}
          isRequired
        /> */}
      </div>
      <Field
        label="Adresse"
        name="adress"
        defaultValue={project.addresses}
      />
      <Field
        label="Code Postal"
        name="postal_code"
        defaultValue="test"
      />
      <Field label="Ville" name="city" defaultValue="test" />
    </Modal>
  );
}
