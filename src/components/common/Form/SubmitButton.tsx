// src/components/SubmitButton.tsx
import React from "react";

interface SubmitButtonProps {
  label: string; // The label for the button (e.g., "Register")
  className?: string; // Optional additional classes for customization
  isSubmitting?: boolean; // Optionally pass `true` if form is submitting
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  className = "",
  isSubmitting = false,
}) => {
  return (
    <button
      type="submit"
      className={`btn w-full mt-4 ${className} ${
        isSubmitting ? "btn-disabled" : ""
      }`}
      disabled={isSubmitting} // Disable the button if form is submitting
    >
      {isSubmitting ? "Submitting..." : label}
    </button>
  );
};

export default SubmitButton;
