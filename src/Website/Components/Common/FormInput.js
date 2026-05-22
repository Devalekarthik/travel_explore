import React from "react";

/**
 * Reusable Form Input Component
 * Handles input fields with error display
 * 
 * @param {Object} props
 * @param {string} props.type - Input type (text, email, number, password, date, etc.)
 * @param {string} props.name - Input name for form handling
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - onChange handler
 * @param {string} props.error - Error message to display (if any)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.inputClassName - CSS classes for input element
 * @param {string} props.errorClassName - CSS classes for error element
 * @param {boolean} props.isRequired - Whether field is required
 * @param {Object} props.rest - Any other props to pass to input element
 */
const FormInput = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error = "",
  className = "",
  inputClassName = "form-control",
  errorClassName = "",
  isRequired = false,
  ...rest
}) => {
  return (
    <div className={`form-input-wrapper ${className}`}>
      <input
        type={type}
        name={name}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && (
        <p className={`form-input-error ${errorClassName}`}>*{error}</p>
      )}
    </div>
  );
};

export default FormInput;
