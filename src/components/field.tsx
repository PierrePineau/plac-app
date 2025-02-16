import { icon } from 'leaflet';
import React from 'react';

interface FieldProps {
  type?: string;
  name: string;
  id?: string;
  label?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  unit?: string;
  options?: { value: string; label: string; selected?: boolean; disabled?: boolean }[];
  selectAll?: boolean;
  value?: string;
  icon?: React.ReactNode;
  [key: string]: any; // Pour les attributs supplémentaires
}

const Field: React.FC<FieldProps> = ({
  type = 'text',
  name = '',
  id = null,
  label = null,
  required = true,
  className = '',
  containerClassName = '',
  unit = null,
  options = [],
  selectAll = false,
  value = '',
  icon = null,
  ...attributes
}) => {
  const uniqueId = id || `${name}-${Math.random().toString(36).substr(2, 9)}`;
  className += ' border-gray-300 border rounded-md';
  const renderInput = () => {
    switch (type) {
      case 'tel':
        className += ' js-intl-tel-input';
        return <input type={type} name={name} id={uniqueId} className={`form-control ${className}`} required={required} {...attributes} />;
      case 'radio':
        return (
          <div className="">
            <input type="radio" name={name} id={uniqueId} className={`field--check ${className}`} required={required} {...attributes} />
            <label htmlFor={uniqueId} className={`field__label ${label ? '' : 'hidden d-none'}`}>
              {label}
            </label>
          </div>
        );
      case 'checkbox':
        return (
          <div className="">
            <input type="checkbox" name={name} id={uniqueId} className={`field--check ${className}`} required={required} {...attributes} />
            <label htmlFor={uniqueId} className={`field__label ${label ? '' : 'hidden d-none'}`}>
              {label}
            </label>
          </div>
        );
      case 'select':
        return (
          <select name={name} id={uniqueId} className={`field__select js-select ${className}`} required={required} {...attributes}>
            {selectAll && (
              <optgroup label={label || 'Résultats'} data-selectall="true">
                {options?.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    selected={option.selected}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </optgroup>
            )}
            {!selectAll &&
              options?.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  selected={option.selected}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            name={name}
            id={uniqueId}
            className={`form-control ${className}`}
            required={required}
            {...attributes}
          >
            {value}
          </textarea>
        );
      case 'hidden':
        containerClassName = 'hidden';
        className += ' hidden';
        return <input type="hidden" name={name} id={uniqueId} className={className} required={required} {...attributes} />;
      default:
        return (
          <input
            type={type}
            name={name}
            id={uniqueId}
            className={`field ${className}`}
            required={required}
            {...attributes}
          />
        );
    }
  };

  return (
    <div className={`field__container ${containerClassName}`}>
      {(type !== 'hidden' && (label != null && label != '')) && (
        <label htmlFor={uniqueId} className={`field__label`}>
          {label}
        </label>
      )}
      {unit ? (
        <div className="field__wrapper field--icons">
          {renderInput()}
          <span className="field__icon field__unit right-0">{unit}</span>
        </div>
      ) : icon ? (
        <div className="field__wrapper field--icons">
          {renderInput()}
          <span className="field__icon left-0">{icon}</span>
        </div>
      ) : (
        renderInput()
      )}
    </div>
  );
};

export default Field;
