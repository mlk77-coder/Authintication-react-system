import React from 'react';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`
          w-full px-4 py-2 rounded-lg bg-white border
          transition-all duration-200 ease-in-out
          ${error 
            ? 'border-red-400 focus:border-red-500 focus:ring focus:ring-red-200' 
            : 'border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'
          }
          focus:outline-none focus:ring-opacity-50
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;