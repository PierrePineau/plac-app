import React from "react";

interface FormModalProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  defaultValues?: {
    name?: string;
    description?: string;
  };
}

const CreateOrModifyNotes: React.FC<FormModalProps> = ({
  onSubmit,
  submitLabel,
  defaultValues = {}
}) => {
  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="name"
          className="  text-paragraphMedium text-neutral-950">
          Titre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
          placeholder="Nom du chantier"
          defaultValue={defaultValues.name || ""}
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="  text-paragraphMedium text-neutral-950">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="flex min-h-40 p-3 justify-center items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
          placeholder="Description"
          defaultValue={defaultValues.description || ""}
          required
        />
      </div>
      <div className="flex flex-row gap-2 items-end justify-end">
        <button
          type="submit"
          className="bg-neutral-50 text-neutral-950   text-paragraphRegular px-4 py-2 rounded-md hover:bg-neutral-100">
          Annuler
        </button>
        <button
          type="submit"
          className="bg-brand-950 text-white   text-paragraphRegular px-4 py-2 rounded-md hover:bg-brand-700">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CreateOrModifyNotes;
