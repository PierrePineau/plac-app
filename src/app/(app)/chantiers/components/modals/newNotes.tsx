"use client";
import React from "react";
import Field from "@/components/field";
import Modal from "@/components/modal";
import { useProjectStore } from "@/store/user/projectStore";
import { Plus } from "lucide-react";
import { useNoteStore } from "@/store/user/noteStore";

export default function NewNote() {
  const { create } = useNoteStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const note = {
      name: data.name as string,
      desc: data.desc as string,
      organisation: localStorage.getItem("idOrganisation")
    };
    await create(note);
  };

  return (
    <Modal
      title="Nouvelle note"
      icon={<Plus />}
      text="Ajouter une note"
      onSubmit={handleSubmit}
      store={useNoteStore}>
      <Field label="Nom" name="name" required />
      <Field label="Description" name="desc" required />
    </Modal>
  );
}
