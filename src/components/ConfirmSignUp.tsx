import React, { useState } from 'react';

interface ConfirmSignUpProps {
  onConfirm: (code: string) => void;
}

const ConfirmSignUp: React.FC<ConfirmSignUpProps> = ({ onConfirm }) => {
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(confirmationCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
        placeholder="Enter confirmation code"
        className="w-full px-3 py-2 border rounded"
      />
      <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Confirm Sign Up
      </button>
    </form>
  );
};

export default ConfirmSignUp;