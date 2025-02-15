import React from "react";

interface FormModalProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  defaultValues?: {
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    chief?: string;
    status?: string;
    adress?: string;
    postal_code?: string;
    city?: string;
  };
}

const CreateOrModifyYard: React.FC<FormModalProps> = ({
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
          Nom du chantier
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
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="startDate"
            className="  text-paragraphMedium text-neutral-950">
            Date de début
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white   text-paragraphMedium text-neutral-950">
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="w-full bg-transparent outline-none"
              defaultValue={defaultValues.startDate || ""}
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="endDate"
            className="  text-paragraphMedium text-neutral-950">
            Date de fin
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white   text-paragraphMedium text-neutral-950">
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="w-full bg-transparent outline-none"
              defaultValue={defaultValues.endDate || ""}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="chief"
            className="  text-paragraphMedium text-neutral-950">
            Chef de chantier
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white   text-paragraphMedium text-neutral-950">
            <input
              type="text"
              id="chief"
              name="chief"
              className="w-full bg-transparent outline-none"
              defaultValue={defaultValues.chief || ""}
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="status"
            className="  text-paragraphMedium text-neutral-950">
            Statut
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white   text-paragraphMedium text-neutral-950">
            <select
              id="status"
              name="status"
              className="w-full bg-transparent outline-none appearance-none"
              defaultValue={defaultValues.status || "en_cours"}
              required>
              <option value="en_cours">En cours</option>
              <option value="termine">Terminé</option>
              <option value="annule">Annulé</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="adress"
          className="  text-paragraphMedium text-neutral-950">
          Adresse
        </label>
        <input
          type="text"
          id="adress"
          name="adress"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
          placeholder="Adresse"
          defaultValue={defaultValues.adress || ""}
          required
        />
      </div>
      <div>
        <label
          htmlFor="postal_code"
          className="  text-paragraphMedium text-neutral-950">
          Code Postal
        </label>
        <input
          type="text"
          id="postal_code"
          name="postal_code"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
          defaultValue={defaultValues.postal_code || ""}
          required
        />
      </div>
      <div>
        <label
          htmlFor="city"
          className="  text-paragraphMedium text-neutral-950">
          Ville
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded   text-paragraphMedium text-neutral-950"
          defaultValue={defaultValues.city || ""}
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

export default CreateOrModifyYard;
