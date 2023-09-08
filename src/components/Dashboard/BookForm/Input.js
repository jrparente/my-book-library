import React from "react";

const Input = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="form-group">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      />
    </div>
  );
};

export default Input;
