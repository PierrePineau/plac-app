"use client";
import React from "react";
import Field from "@/components/Field";
import Modal from "@/components/Modal";
import { useProjectStore } from "@/store/user/projectStore";
import { Plus } from "lucide-react";
import { useNoteStore } from "@/store/user/noteStore";

interface NewProps {
  title: string;
}

export default function NewNote({ title }: NewProps) {
  const { create } = useNoteStore();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const note = {
      name: data.name as string,
      content: data.desc as string,
      idProject: localStorage.getItem("projectId")
    };
    await create(note);
  };

  return (
    <Modal
      title="Nouvelle note"
      icon={<Plus />}
      text={title}
      onSubmit={handleSubmit}
      store={useNoteStore}>
      <Field label="Nom" name="name" required />
      <Field label="Description" name="desc" required />
    </Modal>
  );
}
