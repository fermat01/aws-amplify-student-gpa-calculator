import React, { useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import PasswordInput from './PasswordInput';
import ConfirmSignUp from './ConfirmSignUp';

interface SignUpProps {
  onSignUp: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      await signUp({ username: email, password });
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error signing up:', error);

      // Use a type guard to check if the error is an instance of Error
      if (error instanceof Error) {
        setErrorMessage(error.message); // Display the error message from the caught error
      } else {
        setErrorMessage('An unknown error occurred. Please try again.');
      }
    }
  };

  const handleConfirmSignUp = async (code: string) => {
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      onSignUp();
    } catch (error) {
      console.error('Error confirming sign up:', error);
      
      // Use a type guard to check if the error is an instance of Error
      if (error instanceof Error) {
        setErrorMessage(error.message); // Display the error message from the caught error
      } else {
        setErrorMessage('An unknown error occurred during confirmation. Please try again.');
      }
    }
  };

  if (showConfirmation) {
    return <ConfirmSignUp onConfirm={handleConfirmSignUp} />;
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        id="password"
      />
      <PasswordInput
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        id="confirm-password"
      />
      <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;