import React from "react";
import { useFormContext } from "react-hook-form";

interface CheckboxFieldProps {
  name: string; // Field name
  label: string; // Label for the checkbox
  className?: string; // Optional styling class
  validation?: object; // Validation rules for react-hook-form
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  className = "",
  validation = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4 flex items-center">
      <input
        defaultChecked={true}
        id={name}
        type="checkbox"
        {...register(name, validation)}
        className={`checkbox ${className}`}
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CheckboxField;
