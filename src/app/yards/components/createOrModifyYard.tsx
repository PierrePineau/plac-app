import React from "react";

interface FormModalProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
}

const CreateOrModifyYard: React.FC<FormModalProps> = ({
  onSubmit,
  submitLabel
}) => {
  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="name"
          className="font-satoshi text-paragraphMedium text-neutral-950">
          Nom du chantier
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
          placeholder="Nom du chantier"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="font-satoshi text-paragraphMedium text-neutral-950">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="flex min-h-40 p-3 justify-center items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
          placeholder="Description"
          required
        />
      </div>
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="startDate"
            className="font-satoshi text-paragraphMedium text-neutral-950">
            Date de début
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white">
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="endDate"
            className="font-satoshi text-paragraphMedium text-neutral-950">
            Date de fin
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white">
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="chief"
            className="font-satoshi text-paragraphMedium text-neutral-950">
            Chef de chantier
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white">
            <input
              type="text"
              id="chief"
              name="chief"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="status"
            className="font-satoshi text-paragraphMedium text-neutral-950">
            Statut
          </label>
          <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white">
            <select
              id="status"
              name="status"
              className="w-full bg-transparent outline-none appearance-none"
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
          className="font-satoshi text-paragraphMedium text-neutral-950">
          Adresse
        </label>
        <input
          type="text"
          id="adress"
          name="adress"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
          placeholder="Adresse"
          required
        />
      </div>
      <div>
        <label
          htmlFor="postal_code"
          className="font-satoshi text-paragraphMedium text-neutral-950">
          Code Postal
        </label>
        <input
          type="text"
          id="postal_code"
          name="postal_code"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
          required
        />
      </div>
      <div>
        <label
          htmlFor="city"
          className="font-satoshi text-paragraphMedium text-neutral-950">
          Ville
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className="flex h-11 p-3 items-center gap-2 self-stretch w-full border border-neutral-200 rounded"
          required
        />
      </div>
      <div className="flex flex-row gap-2 items-end justify-end">
        <button
          type="submit"
          className="bg-neutral-50 text-neutral-950 font-satoshi text-paragraphRegular px-4 py-2 rounded-md hover:bg-neutral-100">
          Annuler
        </button>
        <button
          type="submit"
          className="bg-brand-950 text-white font-satoshi text-paragraphRegular px-4 py-2 rounded-md hover:bg-brand-700">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CreateOrModifyYard;
