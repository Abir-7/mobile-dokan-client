import React from "react";
import { useFormContext } from "react-hook-form";

interface TextareaFieldProps {
  name: string; // Field name
  label: string; // Label for the field
  placeholder?: string; // Placeholder text
  className?: string; // Optional styling class
  validation?: object; // Validation rules for react-hook-form
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  name,
  label,
  placeholder = "",
  className = "",
  validation = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        {...register(name, validation)}
        className={`textarea textarea-bordered w-full mt-1 ${className}`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextareaField;
