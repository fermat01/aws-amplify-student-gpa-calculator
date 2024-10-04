// src/components/ForgotPassword.tsx
import React, { useState } from 'react';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import { EyeIcon, EyeOffIcon } from 'lucide-react'; // Make sure to install lucide-react

interface ForgotPasswordProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onCancel, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [stage, setStage] = useState<'request' | 'confirm'>('request');
  const [showPassword, setShowPassword] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ username: email });
      setStage('confirm');
    } catch (error) {
      console.error('Error requesting password reset:', error);
      alert('Failed to request password reset. Please try again.');
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmResetPassword({ username: email, confirmationCode: code, newPassword });
      onSuccess();
    } catch (error) {
      console.error('Error confirming password reset:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (stage === 'request') {
    return (
      <form onSubmit={handleRequestReset} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Request Password Reset
        </button>
        <button type="button" onClick={onCancel} className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
          Cancel
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleConfirmReset} className="space-y-4">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Confirmation Code"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-3 py-2 border rounded pr-10"
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPassword;