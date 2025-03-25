"use client";
import React from "react";
import Field from "@/components/Field";
import Modal from "@/components/Modal";
import { FileEdit, Plus, Trash2 } from "lucide-react";
import { useClientStore } from "@/store/user/clientStore";
import { Alert } from "@heroui/alert";

interface DeleteProps {
  client: Client;
}

export default function Delete({ client }: DeleteProps) {
  const { delete: deleteOne } = useClientStore();

  const handleSubmit = async (formData: FormData) => {
    // const data = Object.fromEntries(formData.entries());
    // const client = {
    //   name: data.name as string,
    //   email: data.email as string,
    //   phone: data.phone as string,
    //   adress: data.adress as string,
    //   postal_code: data.postal_code as string,
    //   city: data.city as string
    // };
    await deleteOne(client.id);
  };

  return (
    <Modal
      title="Supprimer le client"
      icon={<Trash2 />}
      text={"Supprimer"}
      btnVariant="danger"
      onSubmit={handleSubmit}
      buttonValidationTitle="Supprimer"
      store={useClientStore}>
        <Alert
            variant={"bordered"}
            color="danger"
            description={"Attention, vous êtes sur le point de supprimer un client. Cette action est irréversible."}
            className="mb-4"
          />
    </Modal>
  );
}
