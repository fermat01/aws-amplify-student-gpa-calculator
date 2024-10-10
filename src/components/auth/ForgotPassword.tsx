import React, { useState } from 'react';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

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
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCode = (code: string) => {
    return /^\d{6}$/.test(code);
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    return (
      password.length >= minLength &&
      hasNumber &&
      hasSpecialChar &&
      hasUppercase &&
      hasLowercase
    );
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setGeneralError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      await resetPassword({ username: email });
      setStage('confirm');
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setGeneralError('Failed to request password reset. Please try again.');
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');
    setPasswordError('');
    setGeneralError('');

    if (!validateCode(code)) {
      setCodeError('Please enter a valid 6-digit confirmation code');
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
      return;
    }

    try {
      await confirmResetPassword({ username: email, confirmationCode: code, newPassword });
      onSuccess();
    } catch (error) {
      console.error('Error confirming password reset:', error);
      setGeneralError('Failed to reset password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (stage === 'request') {
    return (
      <form onSubmit={handleRequestReset} className="space-y-4">
        {generalError && <div className="text-red-500">{generalError}</div>}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            onBlur={() => {
              if (email && !validateEmail(email)) {
                setEmailError('Please enter a valid email address');
              }
            }}
            placeholder="Email"
            className={`w-full px-3 py-2 border rounded ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
        </div>
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
      {generalError && <div className="text-red-500">{generalError}</div>}
      <div>
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
            setCodeError('');
          }}
          onBlur={() => {
            if (code && !validateCode(code)) {
              setCodeError('Please enter a valid 6-digit confirmation code');
            }
          }}
          placeholder="Confirmation Code"
          className={`w-full px-3 py-2 border rounded ${codeError ? 'border-red-500' : ''}`}
          maxLength={6}
        />
        {codeError && <div className="text-red-500 text-sm mt-1">{codeError}</div>}
      </div>
      <div className="relative">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setPasswordError('');
            }}
            onBlur={() => {
              if (newPassword && !validatePassword(newPassword)) {
                setPasswordError(
                  'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                );
              }
            }}
            placeholder="New Password"
            className={`w-full px-3 py-2 border rounded pr-10 ${passwordError ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 flex items-center"
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPassword;