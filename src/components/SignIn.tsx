import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import PasswordInput from './PasswordInput';

interface SignInProps {
  onSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setEmailError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      await signIn({ username: email, password });
      onSignIn();
    } catch (error) {
      console.error('Error signing in:', error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}
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
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        id="password"
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;