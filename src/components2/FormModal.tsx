import React from "react";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "date";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  fields: Field[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  fields,
  onSubmit,
  submitLabel = "Enregistrer"
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {fields.map((field, index) =>
              index % 2 === 0 && index + 1 < fields.length ? (
                <div key={field.name} className="flex gap-4">
                  {[fields[index], fields[index + 1]].map((subField) => (
                    <div key={subField.name} className="flex-1">
                      <label
                        htmlFor={subField.name}
                        className="block font-semibold">
                        {subField.label}
                      </label>
                      {subField.type === "textarea" ? (
                        <textarea
                          id={subField.name}
                          name={subField.name}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder={subField.placeholder}
                          required={subField.required}
                        />
                      ) : subField.type === "select" ? (
                        <select
                          id={subField.name}
                          name={subField.name}
                          className="w-full p-2 border border-gray-300 rounded"
                          required={subField.required}>
                          {subField.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={subField.type || "text"}
                          id={subField.name}
                          name={subField.name}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder={subField.placeholder}
                          required={subField.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : index % 2 === 0 ? (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block font-semibold">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      className="w-full p-2 border border-gray-300 rounded"
                      required={field.required}>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      id={field.name}
                      name={field.name}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              ) : null
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={onClose}>
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-950 text-white rounded hover:bg-brand-700">
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default FormModal;
