import React from "react";

interface FormModalProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  defaultValues?: User;
}

const CreateOrModifyEmployee: React.FC<FormModalProps> = ({
  onSubmit,
  submitLabel,
  defaultValues
}) => {
  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="name"
            className="  text-paragraphMedium text-neutral-950">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
            placeholder="Nom de famille"
            defaultValue={defaultValues?.lastname || ""}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="name"
            className="  text-paragraphMedium text-neutral-950">
            Prénom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
            placeholder="Prénom"
            defaultValue={defaultValues?.firstname || ""}
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="name"
          className="  text-paragraphMedium text-neutral-950">
          Email
        </label>
        <input
          type="email"
          id="name"
          name="name"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
          placeholder="Adresse email"
          defaultValue={defaultValues?.email || ""}
          required
        />
      </div>
      <div>
        <label
          htmlFor="name"
          className="  text-paragraphMedium text-neutral-950">
          Numéro de téléphone
        </label>
        <input
          type="tel"
          id="name"
          name="name"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
          placeholder="Numéro de téléphone"
          defaultValue={defaultValues?.email || ""}
          required
        />
      </div>
      <div>
        <label
          htmlFor="name"
          className="  text-paragraphMedium text-neutral-950">
          Adresse
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
          placeholder="Adresse"
          defaultValue={defaultValues?.email || ""}
          required
        />
      </div>
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="name"
            className="  text-paragraphMedium text-neutral-950">
            Code postale
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
            placeholder="Code postale"
            defaultValue={defaultValues?.lastname || ""}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="name"
            className="  text-paragraphMedium text-neutral-950">
            Ville
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
            placeholder="Ville"
            defaultValue={defaultValues?.firstname || ""}
            required
          />
        </div>
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

export default CreateOrModifyEmployee;
