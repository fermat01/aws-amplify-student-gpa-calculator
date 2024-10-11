import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  id: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, placeholder, id }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        className="w-full px-3 py-2 border rounded pr-10" // Adjusted right padding
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center justify-center"
      >
        <div className="bg-gray-200 h-full px-3 flex items-center justify-center rounded-r"> {/* Adjusted to fill height */}
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4 text-gray-600" />
          ) : (
            <EyeIcon className="h-4 w-4 text-gray-600" />
          )}
        </div>
      </button>
    </div>
  );
};

export default PasswordInput;