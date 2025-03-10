"use client";
import { Input } from '@heroui/react';
import React, { useState } from 'react';
import Btn from './btn';
import { Eye, EyeClosed } from 'lucide-react';

interface FieldProps {
  type?: string;
  name: string;
  id?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  unit?: string;
  value?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  [key: string]: any; // Pour les attributs supplémentaires
}

// const Field: React.FC<FieldProps> = ({
//   type = 'text',
//   name = '',
//   id = null,
//   label = null,
//   required = true,
//   className = '',
//   containerClassName = '',
//   unit = null,
//   options = [],
//   selectAll = false,
//   value = '',
//   icon = null,
//   ...attributes
// }) => {
//   const uniqueId = id || `${name}-${Math.random().toString(36).substr(2, 9)}`;
//   className += ' border-gray-300 border rounded-md';
//   const renderInput = () => {
//     switch (type) {
//       case 'tel':
//         className += ' js-intl-tel-input';
//         return <input type={type} name={name} id={uniqueId} className={`form-control ${className}`} required={required} {...attributes} />;
//       case 'radio':
//         return (
//           <div className="">
//             <input type="radio" name={name} id={uniqueId} className={`field--check ${className}`} required={required} {...attributes} />
//             <label htmlFor={uniqueId} className={`field__label ${label ? '' : 'hidden d-none'}`}>
//               {label}
//             </label>
//           </div>
//         );
//       case 'checkbox':
//         return (
//           <div className="">
//             <input type="checkbox" name={name} id={uniqueId} className={`field--check ${className}`} required={required} {...attributes} />
//             <label htmlFor={uniqueId} className={`field__label ${label ? '' : 'hidden d-none'}`}>
//               {label}
//             </label>
//           </div>
//         );
//       case 'select':
//         return (
//           <select name={name} id={uniqueId} className={`field__select js-select ${className}`} required={required} {...attributes}>
//             {selectAll && (
//               <optgroup label={label || 'Résultats'} data-selectall="true">
//                 {options?.map((option) => (
//                   <option
//                     key={option.value}
//                     value={option.value}
//                     selected={option.selected}
//                     disabled={option.disabled}
//                   >
//                     {option.label}
//                   </option>
//                 ))}
//               </optgroup>
//             )}
//             {!selectAll &&
//               options?.map((option) => (
//                 <option
//                   key={option.value}
//                   value={option.value}
//                   selected={option.selected}
//                   disabled={option.disabled}
//                 >
//                   {option.label}
//                 </option>
//               ))}
//           </select>
//         );
//       case 'textarea':
//         return (
//           <textarea
//             name={name}
//             id={uniqueId}
//             className={`form-control ${className}`}
//             required={required}
//             {...attributes}
//           >
//             {value}
//           </textarea>
//         );
//       case 'hidden':
//         containerClassName = 'hidden';
//         className += ' hidden';
//         return <input type="hidden" name={name} id={uniqueId} className={className} required={required} {...attributes} />;
//       default:
//         return (
//           <input
//             type={type}
//             name={name}
//             id={uniqueId}
//             className={`field ${className}`}
//             required={required}
//             {...attributes}
//           />
//         );
//     }
//   };

//   return (
//     <div className={`field__container ${containerClassName}`}>
//       {(type !== 'hidden' && (label != null && label != '')) && (
//         <label htmlFor={uniqueId} className={`field__label`}>
//           {label}
//         </label>
//       )}
//       {unit ? (
//         <div className="field__wrapper field--icons">
//           {renderInput()}
//           <span className="field__icon field__unit right-0">{unit}</span>
//         </div>
//       ) : icon ? (
//         <div className="field__wrapper field--icons">
//           {renderInput()}
//           <span className="field__icon left-0">{icon}</span>
//         </div>
//       ) : (
//         renderInput()
//       )}
//     </div>
//   );
// };

// export default Field;

const Field: React.FC<FieldProps> = ({
    type = 'text',
    name = '',
    id = null,
    label = null,
    className = '',
    containerClassName = '',
    value = '',
    endContent = null,
    startContent = null,
    placeholder = ' ',
    ...attributes
}) => {

    const [typeInput, setType] = useState(type ?? 'text');
    const classInput = [
        "field",
        "placeholder:text-neutral-300",
        "hover:border-neutral-400",
        "focus:ring",
        "focus:ring-2",
        "focus:ring-blue-500",
        "focus:outline",
        "rounded",
        "min-h-10",
        "h-10",
        "pl-4",
        "pr-4",
        "py-2",
        "w-full",
    ];
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setType(isVisible ? 'password' : 'text');
    }
    if (type === 'password') {
        endContent = (
            <Btn
            isIconOnly
            variant="none"
            className="btn-icon bg-transparent focus:outline-none" onClick={toggleVisibility}>
            {isVisible ? (
                <Eye className="text-neutral-400" width={18} />
            ) : (
                <EyeClosed className="text-neutral-400" width={18} />
            )}
            </Btn>
        );
    }

    if (endContent) {
        endContent = (
            <div className="absolute right-0 flex items-center h-full">
                {endContent}
            </div>
        );

        classInput.push('pr-10');
        // On retire la classe pr-4 pour éviter le conflit
        classInput.splice(classInput.indexOf('pr-4'), 1);
    }

    if (startContent) {
        startContent = (
            <div className="absolute left-0 flex items-center h-full">
                {startContent}
            </div>
        );

        classInput.push('pl-10');
        // On retire la classe pl-4 pour éviter le conflit
        classInput.splice(classInput.indexOf('pl-4'), 1);
    }

    return (
        <Input
            className={`field ${className}`}
            variant="bordered"
            radius={"sm"}
            startContent= {startContent ?? null}
            endContent={endContent ?? null}
            type={typeInput}
            name={name ?? ''}
            label={label ?? ''}
            placeholder={placeholder ?? ' '}
            labelPlacement={'outside'}
            value={value ?? ''}
            classNames={{
                label: [
                    "field__label",
                ],
                input: classInput,
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    "field__wrapper",
                    "shadow-sm",
                    "p-0",
                    "min-h-unset",
                    "h-unset",
                    `${containerClassName}`,
                ],
            }}
            {...attributes}
        />
    );
};

export default Field;
